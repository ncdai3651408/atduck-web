const { src, dest, watch, series } = require('gulp')
const mergeStream = require('merge-stream')
const sass = require('sass')
const yupSass = require('gulp-sass')(sass)
const del = require('del')
const uglify = require('gulp-uglify')

const buildSass = (_src, _dest) => {
  return src(_src)
    .pipe(yupSass({ outputStyle: 'compressed' }).on('error', yupSass.logError))
    .pipe(dest(_dest))
}

const cleanBuild = () => {
  return del('build')
}

const buildWeb = () => {
  const rootDir = './build'
  const jsDir = './build/js'
  const cssDir = './build/css'
  const libsDir = './build/libs'
  const imagesDir = './build/images'

  return mergeStream(
    src('./src/libs/**/*').pipe(dest(libsDir)),
    src('./src/js/**/*').pipe(uglify()).pipe(dest(jsDir)),
    src('./src/images/**/*').pipe(dest(imagesDir)),
    src('./src/*.html').pipe(dest(rootDir)),
    buildSass('./src/scss/**/*.scss', cssDir)
  )
}

const buildAll = series(
  cleanBuild,
  buildWeb
)

const watchAll = () => {
  watch(['src/**/*'], buildAll)
}

exports.build = buildAll
exports.watch = watchAll
