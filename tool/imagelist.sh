(
  cd public && (
    echo 'export const kFileList: string[] = ['
    find images/o -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    find images/n -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    find images/e -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    echo '];'
  ) > ../src/imagelist.ts
)
