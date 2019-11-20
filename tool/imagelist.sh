(
  echo 'export const kFileList = ['
  find images -name '*.png' | xargs -L 1 -I {} echo '  "{}",'
  echo '];'
) > src/imagelist.ts
