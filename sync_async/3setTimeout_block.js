let queue = []
for (let i = 0; i < 9999; i++) {
  queue.push({ key: i })
}

setTimeout(() => {
  console.log('hello world')
}, 0)

queue.forEach((item) => {
  console.log(item)
})