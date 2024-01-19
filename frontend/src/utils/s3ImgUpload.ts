import AWS from 'aws-sdk';

export const uploadS3 = async (file: File) => {
  const REGION = import.meta.env.VITE_APP_REGION;
  const ACESS_KEY_ID = import.meta.env.VITE_APP_ACCESS_KEY_ID;
  const SECRET_ACESS_KEY_ID = import.meta.env.VITE_APP_SECRET_ACCESS_KEY_ID;
  const BUCKET_NAME = import.meta.env.VITE_APP_BUCKET_NAME;

  AWS.config.update({
    region: REGION,
    accessKeyId: ACESS_KEY_ID,
    secretAccessKey: SECRET_ACESS_KEY_ID,
  });
  const timestamp = Date.now();
  const filename = `uploads/survey-images/${timestamp}_${file.name}`;
  const upload = new AWS.S3.ManagedUpload({
    params: {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: file,
    },
  });

  try {
    await upload.promise();
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${filename}`;
  } catch (err) {
    console.error(err);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};
