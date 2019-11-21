(
  echo 'export const kFileList: string[] = ['
  find images/0 -name '*.png' | xargs -L 1 -I {} echo '  "{}",'
  echo '];'
) > src/imagelist.ts
