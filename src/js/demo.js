import '../css/index.css'

console.log('demo');

fetch('/api')
  .then(json => json.json())
  .then(json => console.log(json))

fetch('/api/cities/1')
  .then(json => json.json())
  .then(json => console.log(json))


class Demo {
  @log()
  say() {
    return 1;
  }

  // @log()
  get doIt() {
    return 1;
  }
}

var d = new Demo().say();

function log (type = '') {
  return (target, name, descriptor) => {
    const method = descriptor.value; // 具体三个方法
    descriptor.value = (...args) => {
      console.log(`${ type }`);
      type = type ? type : (typeof(target[name])).toUpperCase();
      let result;
      try {
        result = method.apply(target, args);
        console.log(`[${ type } ${ name }] [RET ${ result }] [STATUS 成功]`)
      } catch (error) {
        console.log(`[${ type } ${ name }] [RET ${ result }] [STATUS 失败]`)
      }
      return result;
    }
  }
}
