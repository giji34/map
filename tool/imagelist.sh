(
  cd public
  (
    echo 'export const kFileList: string[] = ['
    find images/o -name '*.png' | xargs -L 1 -I {} echo '  "{}",'
    find images/n -name '*.png' | xargs -L 1 -I {} echo '  "{}",'
    find images/e -name '*.png' | xargs -L 1 -I {} echo '  "{}",'
    echo '];'
  ) > ../src/imagelist.ts
)
