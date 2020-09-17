git add -f ./dist
git commit -m "build"
git push --delete origin gh-pages
git subtree --prefix dist push origin gh-pages
git reset HEAD^ --soft
rm -rf ./dist
git reset -- ./dist