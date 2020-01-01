echo '====================================='
echo 'BEFORE'
echo '-------------------------------------'
du -d 0 -h images/{o,n,e}
(
    N=$(getconf _NPROCESSORS_ONLN 2>/dev/null || nproc)
    find images/{o,n,e} -name '*.png' -print0 | xargs -0 -I{} -P $N node_modules/zopflipng-bin/vendor/zopflipng -q -y {} public/{}
) >/dev/null
echo '====================================='
echo 'AFTER'
echo '-------------------------------------'
du -d 0 -h public/images/{o,n,e}
