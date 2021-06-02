// function password(target: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
//   const method = propertyDescriptor.value

//   propertyDescriptor.value = function (...args: any[]) {
//     // 将 greet 的参数列表转换为字符串
//     const param = args[0]
//     if (param === '123') {
//       return method.apply(this, args)
//     } else {
//       return '密码错误'
//     }
//   }
//   return propertyDescriptor
// }

// class Guard {
//   constructor(role: string) {
//     this.role = role
//   }
//   private role: string

//   // 查询
//   @password
//   getRole(): string {
//     return this.role
//   }
// }

// const g1 = new Guard('admin')

// g1.getRole()

function password(v: string) {
  return (target: Object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
    const method = propertyDescriptor.value

    propertyDescriptor.value = function (...args: any[]) {
      // 将 greet 的参数列表转换为字符串
      const param = Array.from(args)[0]
      if (param === v) {
        return method.apply(this, args)
      } else {
        return '密码错误'
      }
    }
    return propertyDescriptor
  }
}

class Guard {
  constructor(role: string) {
    this.role = role
  }
  private role: string

  // 查询
  @password('124')
  getRole(v: string): string {
    return this.role
  }
  // setPassword(v: string) {
  //   this.password = v
  // }
}

const g1 = new Guard('admin')
// g1.setPassword('123')
let a = g1.getRole('123')
console.log(a)
a = g1.getRole('222')
console.log(a)
a = g1.getRole('124')
console.log(a)
