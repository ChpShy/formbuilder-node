console.log('22');

process.stdout.write('请输入内容：');
process.stdin.resume();
process.stdin.on('data', function (chunk) {
   console.log(chunk);
   process.stdin.pause();
});