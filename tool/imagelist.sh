WORLD_NAME=$1

(
  cd public && (
    echo 'export const kFileList: string[] = ['
    find images/${WORLD_NAME}/o -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    find images/${WORLD_NAME}/n -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    find images/${WORLD_NAME}/e -name '*.png' -print0 | xargs -0 -L 1 -I {} echo '  "{}",'
    echo '];'
  ) > ../src/imagelists/${WORLD_NAME}.ts
)
