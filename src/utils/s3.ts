import { Injectable } from '@nestjs/common'
import * as aws from 'aws-sdk'
@Injectable()
export class S3 {
  constructor() {
    //credentials
    aws.config.update({
      region: 'us-east-1',
      accessKeyId: 'AKIA4WAANXARDXMUDLG4',
      secretAccessKey: '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'
    })
  }
  async upload(filename: string, stream: any, mimetype: string, bucket: string, destinationFileame: string): Promise<string> {
    //sube o arquivo e retorna a url de acesso
    const s3 = new aws.S3()
    const s3Params = {
      Bucket: bucket,
      Key: destinationFileame,
      ACL: 'public-read',
      ContentType: mimetype,
      Body: stream
    }
    const { Location } = await s3.upload(s3Params).promise()
    console.log(Location)
    return Location
  }
}