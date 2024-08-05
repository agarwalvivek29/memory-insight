from paramiko import SSHClient, AutoAddPolicy, AuthenticationException, SSHException
import os
from aws import generate_presigned_url_upload

bucket_name = 'memory-insight'
object_key = 'remoteId/snapId.lime.compressed'
region_name = 'ap-southeast-1'

presigned_url = generate_presigned_url_upload(bucket_name=bucket_name, object_key=object_key, region_name=region_name)
print(presigned_url)

class Remote:
    def __init__(self, hostname, username, password, pkey, keyfile) -> None:
        self.hostname = hostname
        self.username = username
        self.password = password
        self.pkey = pkey
        self.keyfile = keyfile
        self.sshClient = None

    def execute_command_shell(self, shell, command):
        shell.send(command + '\n')
        buff = ''
        while True:
            resp = shell.recv(1024).decode('utf-8')
            buff += resp
            if buff.endswith('$ ') or buff.endswith('# '):  # Adjust this to the prompt of your remote shell
                break
        return buff
    
    def execute_command_client(self, ssh, command):
        stdin, stdout, stderr = ssh.exec_command(command)

        # Get the results from the executed command
        output = ''
        output += stdout.read().decode()
        output += stderr.read().decode()

        # Get the exit status
        exit_status = stdout.channel.recv_exit_status()

        err = None
        if(exit_status != 0):
            err = stderr.read().decode()
        return exit_status, output, err

    def checkRemote(self):
        ssh = SSHClient()
        ssh.set_missing_host_key_policy(AutoAddPolicy())

        try:
            if self.password:
                print("Attempting password authentication")
                ssh.connect(hostname=self.hostname, username=self.username, password=self.password, key_filename=self.keyfile)
            elif self.pkey:
                print("Attempting private key authentication")
                ssh.connect(hostname=self.hostname, username=self.username, pkey=self.pkey, key_filename=self.keyfile)
            else:
                print("Attempting key file authentication")
                ssh.connect(hostname=self.hostname, username=self.username ,key_filename=self.keyfile)

            print("SSH connection established successfully")

            # Add the server to the database
            print("Adding to Db")

            # Perform operations on the remote server
            stdin, stdout, stderr = ssh.exec_command('uname -a')

            print(stdout.read().decode())

        except AuthenticationException:
            print("Authentication failed, please verify your credentials")
        except SSHException as sshException:
            print(f"Unable to establish SSH connection: {sshException}")
        except Exception as e:
            print(f"Exception in connecting to SSH server: {e}")
        finally:
            ssh.close()

    def setupAvml(self):
        try:
            ssh = SSHClient()
            ssh.set_missing_host_key_policy(AutoAddPolicy())
            self.sshClient = ssh.connect(hostname=self.hostname, username=self.username, password=self.password, pkey=self.pkey, key_filename=self.keyfile)
            print('SSH Connection Successful')

            parallel_commands = [
                'sudo add-apt-repository universe',
                'sudo apt-get update',
                'sudo apt-get install -y build-essential',
                'sudo apt-get install -y musl-dev musl-tools musl',
                'curl https://sh.rustup.rs -sSf | sh -s -- -y',
                # 'git clone https://github.com/microsoft/avml',
            ]

            for command in parallel_commands:
                print(command)
                exit_status, output, err = self.execute_command_client(ssh, command)
                print(f"Exit Status : {exit_status}")
                print(f"Output : {output}")
                if exit_status != 0:
                    print(f"Command failed: {command}")
                    return                

            serial_commands = [
                "cd avml/src",
                "rustup target add x86_64-unknown-linux-musl",
                "cargo build --release --target x86_64-unknown-linux-musl",
                "cargo build --release --target x86_64-unknown-linux-musl --no-default-features",
                "cd ..//target/x86_64-unknown-linux-musl/release",
                "cp avml ~/avml"
            ]

            shell = ssh.invoke_shell()
            for command in serial_commands:
                print(command)
                output = self.execute_command_shell(shell, command)
                print(f"Output : {output}")

            print("AVML setup complete")

        except Exception as e:
            print(f"Exception in setting up Avml : {e}")
        finally:
            ssh.close()
    
    def captureSnapshot(self):
        try:
            ssh = SSHClient()
            ssh.set_missing_host_key_policy(AutoAddPolicy())
            self.sshClient = ssh.connect(hostname=self.hostname, username=self.username, password=self.password, pkey=self.pkey, key_filename=self.keyfile)
            print('SSH Connection Successful')

            shell = ssh.invoke_shell()
            
            # Wait for initial shell output
            while not shell.recv_ready():
                pass
            initial_output = shell.recv(1024).decode('utf-8')
            print(initial_output)

            commands = [
                "cd avml",
                f"sudo ./avml --compress output.lime.compressed",
                "ls -lh output.lime.compressed"
            ]

            for command in commands:
                print(command)
                output = self.execute_command_shell(shell, command)
                print(f"Output : {output}")
                print()
                print()
            
            print("Snapshot captured successfully")
            shell.close()

            parallel_commands = [
                "sudo chmod 644 avml/output.lime.compressed",
                f"curl -X PUT -T 'avml/output.lime.compressed' '{presigned_url}'",
                "rm -f avml/output.lime.compressed"
            ]

            for command in parallel_commands:
                print(command)
                exit_status, output, err = self.execute_command_client(ssh, command)
                print(f"Exit Status : {exit_status}")
                print(f"Output : {output}")
                if exit_status != 0:
                    print(f"Command failed: {command}")
                    return
            
            print("Snapshot uploaded successfully")
        
        except Exception as e:
            print(f"Exception in capturing snapshot : {e}")
        finally:
            ssh.close()

# instance = Remote("52.0.35.202", "ec2-user", None, None, "./memoryInsight.pem")
# instance = Remote("3.0.101.154", "ubuntu", None, None, "./test-container-2.pem")

# instance.checkRemote()
# instance.setupAvml()
# instance.captureSnapshot()

# ssh -i "test-container-2.pem" ubuntu@ec2-3-0-101-154.ap-southeast-1.compute.amazonaws.com
