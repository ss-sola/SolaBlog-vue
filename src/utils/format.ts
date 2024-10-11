import fs from 'fs'
import path from 'path'

interface File {
  path: string
  content: string
}
type TreeNode = {
  groupName: string
  children: {
    name: string
    sort: number
  }[]
}
async function readFile(filePath: string): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`)
        reject(err)
      }
      const file: File = {
        path: filePath,
        content: data
      }
      resolve(file)
    })
  })
}

const tree = [
  {
    groupName: 'linux-程序安装',
    children: [
      {
        name: '安装nextcloud',
        sort: 1
      },
      {
        name: 'centos安装',
        sort: 1
      }
    ]
  }
]

// 读取当前文件夹下所有md文件
async function getMdFiles(dirPath: string = '', files: File[] = []): Promise<File[]> {
  return new Promise<File[]>((resolve, reject) => {
    dirPath = dirPath || path.join(__dirname, '../../public')
    fs.readdir(dirPath, (err, dirList) => {
      if (err) {
        console.error(`Error reading directory: ${err}`)
        reject(err)
      }
      const proList: Promise<void>[] = []
      for (const fileName of dirList) {
        const pro = new Promise<void>(async (resolve, reject) => {
          const filePath = path.join(dirPath, fileName)
          try {
            if (fs.statSync(filePath).isDirectory()) {
              await getMdFiles(filePath, files)
            } else if (fileName.endsWith('.md')) {
              const file = await readFile(filePath)
              files.push(file)
            }
            resolve()
          } catch (error) {
            reject(error)
          }
        })
        proList.push(pro)
      }

      Promise.all(proList)
        .then(() => {
          resolve(files)
        })
        .catch(reject)
    })
  })
}
function createTree(filePaths: string[]): TreeNode[] {
  //读取当前目录下的tree.json文件
  const treePath = path.join(__dirname, '/tree.json')
  let tree: TreeNode[] = []
  if (fs.existsSync(treePath)) {
    tree = JSON.parse(fs.readFileSync(treePath, 'utf8'))
  }

  filePaths.forEach((filePath) => {
    filePath = filePath.substring(filePath.indexOf('public') + 6, filePath.lastIndexOf('\\'))
    // 将路径分割成数组
    const pathSegments = filePath.split(path.sep).filter(Boolean)
    const childName = pathSegments[pathSegments.length - 1]

    const groupName = pathSegments.slice(0, -1).join('-')
    let groupExist = false
    for (const treeNode of tree) {
      if (treeNode.groupName !== groupName) continue
      let flag = false
      for (const child of treeNode.children) {
        if (child.name === childName) {
          flag = true
        }
      }
      if (!flag) {
        treeNode.children.push({
          name: childName,
          sort: 1
        })
      }
      groupExist = true
    }
    if (!groupExist) {
      tree.push({
        groupName,
        children: [
          {
            name: childName,
            sort: 1
          }
        ]
      })
    }
  })

  for (const treeNode of tree) {
    treeNode.children.sort((a, b) => a.sort - b.sort)
  }
  //将tree生成json文件到当前目录
  fs.writeFileSync(path.join(__dirname, '/tree.json'), JSON.stringify(tree))

  return tree
}
async function readMdFiles(files: File[]) {
  for (const file of files) {
    let filePath = file.path
    filePath = filePath.substring(filePath.indexOf('public') + 6, filePath.lastIndexOf('\\'))

    filePath = filePath.replace(/\\/g, '/')
    file.content = updateImagePaths(file.content, filePath)
    if (file.content) {
      fs.writeFileSync(file.path, file.content)
    }
  }
}

function updateImagePaths(mdContent: string, appendString: string): string {
  const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  const htmlImageRegex = /<img\s+([^>]*?src=['"]([^'"]+)['"][^>]*)>/g

  const updatedMdContent = mdContent.replace(mdImageRegex, (match, altText, imageUrl) => {
    const updatedUrl = mergeImgPath(imageUrl, appendString)
    return `![${altText}](${updatedUrl})`
  })

  const updatedContent = updatedMdContent.replace(htmlImageRegex, (match, attrs, imageUrl) => {
    const updatedUrl = mergeImgPath(imageUrl, appendString)
    return `<img ${attrs.replace(imageUrl, updatedUrl)}>`
  })

  function mergeImgPath(imageUrl: string, appendString: string): string {
    imageUrl = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    if (imageUrl.startsWith('http')) {
      return imageUrl
    }
    if (imageUrl.includes('/')) {
      imageUrl = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    }
    return appendString + '/' + imageUrl
  }

  return updatedContent
}
async function init() {
  const mdFiles = await getMdFiles()
  readMdFiles(mdFiles)
  const filePaths = mdFiles.map((file) => file.path)
  createTree(filePaths)
}
export { init }
