import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

def generate_presigned_url_upload(bucket_name, object_key, region_name, expiration=3600):
    """
    Generate a presigned URL to upload an S3 object
    
    :param bucket_name: string
    :param object_key: string
    :param region_name: string, default 'us-east-1'
    :param expiration: time in seconds for the presigned URL to remain valid, default 3600 seconds (1 hour)
    :return: Presigned URL as string. If error, return None.
    """
    s3_client = boto3.client('s3', region_name=region_name)
    
    try:
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_key},
                                                    ExpiresIn=expiration)
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"Credentials error: {e}")
        return None
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return None

    return response
