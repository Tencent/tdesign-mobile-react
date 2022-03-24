:: BASE_DOC ::

## API

### Upload Props

### UploadFile

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
lastModified | Number | - | 上一次变更的时间 | N
name | String | - | 文件名称 | N
percent | Number | - | 下载进度 | N
raw | Object | - | 原始文件对象。TS 类型：`File` | N
response | Object | - | 上传接口返回的数据 | N
size | Number | - | 文件大小 | N
status | String | - | 文件上传状态：上传成功，上传失败，上传中，等待上传。TS 类型：` 'success' | 'fail' | 'progress' | 'waiting'` | N
type | String | - | 文件类型 | N
url | String | - | 文件上传成功后的下载/访问地址 | N
