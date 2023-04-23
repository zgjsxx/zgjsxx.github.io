import{_ as c,V as n,W as i,X as e,Y as t,$ as o,a0 as p,F as r}from"./framework-c954d91f.js";const s={},l=p('<h1 id="c-谷歌规范-静态和全局变量" tabindex="-1"><a class="header-anchor" href="#c-谷歌规范-静态和全局变量" aria-hidden="true">#</a> c++谷歌规范 静态和全局变量</h1><p>2.5. 静态和全局变量 Tip</p><p>禁止定义静态储存周期非POD变量，禁止使用含有副作用的函数初始化POD全局变量，因为多编译单元中的静态变量执行时的构造和析构顺序是未明确的，这将导致代码的不可移植。</p><p>禁止使用类的 静态储存周期 变量：由于构造和析构函数调用顺序的不确定性，它们会导致难以发现的 bug 。不过 constexpr 变量除外，毕竟它们又不涉及动态初始化或析构。</p><p>静态生存周期的对象，即包括了全局变量，静态变量，静态类成员变量和函数静态变量，都必须是原生数据类型 (POD : Plain Old Data): 即 int, char 和 float, 以及 POD 类型的指针、数组和结构体。</p><p>静态变量的构造函数、析构函数和初始化的顺序在 C++ 中是只有部分明确的，甚至随着构建变化而变化，导致难以发现的 bug. 所以除了禁用类类型的全局变量，我们也不允许用函数返回值来初始化 POD 变量，除非该函数（比如 getenv() 或 getpid() ）不涉及任何全局变量。函数作用域里的静态变量除外，毕竟它的初始化顺序是有明确定义的，而且只会在指令执行到它的声明那里才会发生。</p><p>Note</p><p>Xris 译注:</p><p>同一个编译单元内是明确的，静态初始化优先于动态初始化，初始化顺序按照声明顺序进行，销毁则逆序。不同的编译单元之间初始化和销毁顺序属于未明确行为 (unspecified behaviour)。</p><p>同理，全局和静态变量在程序中断时会被析构，无论所谓中断是从 main() 返回还是对 exit() 的调用。析构顺序正好与构造函数调用的顺序相反。但既然构造顺序未定义，那么析构顺序当然也就不定了。比如，在程序结束时某静态变量已经被析构了，但代码还在跑——比如其它线程——并试图访问它且失败；再比如，一个静态 string 变量也许会在一个引用了前者的其它变量析构之前被析构掉。</p><p>改善以上析构问题的办法之一是用 quick_exit() 来代替 exit() 并中断程序。它们的不同之处是前者不会执行任何析构，也不会执行 atexit() 所绑定的任何 handlers. 如果您想在执行 quick_exit() 来中断时执行某 handler（比如刷新 log），您可以把它绑定到 _at_quick_exit(). 如果您想在 exit() 和 quick_exit() 都用上该 handler, 都绑定上去。</p><p>综上所述，我们只允许 POD 类型的静态变量，即完全禁用 vector (使用 C 数组替代) 和 string (使用 const char [])。</p><p>如果您确实需要一个 class 类型的静态或全局变量，可以考虑在 main() 函数或 pthread_once() 内初始化一个指针且永不回收。注意只能用 raw 指针，别用智能指针，毕竟后者的析构函数涉及到上文指出的不定顺序问题。</p><p>Note</p><p>Yang.Y 译注:</p><p>上文提及的静态变量泛指静态生存周期的对象, 包括: 全局变量, 静态变量, 静态类成员变量, 以及函数静态变量.</p><p>译者 (YuleFox) 笔记 cc 中的匿名命名空间可避免命名冲突, 限定作用域, 避免直接使用 using 关键字污染命名空间; 嵌套类符合局部使用原则, 只是不能在其他头文件中前置声明, 尽量不要 public; 尽量不用全局函数和全局变量, 考虑作用域和命名空间限制, 尽量单独形成编译单元; 多线程中的全局变量 (含静态成员变量) 不要使用 class 类型 (含 STL 容器), 避免不明确行为导致的 bug. 作用域的使用, 除了考虑名称污染, 可读性之外, 主要是为降低耦合, 提高编译/执行效率. 译者（acgtyrant）笔记 注意「using 指示（using-directive）」和「using 声明（using-declaration）」的区别。 匿名命名空间说白了就是文件作用域，就像 C static 声明的作用域一样，后者已经被 C++ 标准提倡弃用。 局部变量在声明的同时进行显式值初始化，比起隐式初始化再赋值的两步过程要高效，同时也贯彻了计算机体系结构重要的概念「局部性（locality）」。 注意别在循环犯大量构造和析构的低级错误。</p>',17),_={href:"https://joydig.com/2018/09/30/",target:"_blank",rel:"noopener noreferrer"};function d(g,u){const a=r("ExternalLinkIcon");return n(),i("div",null,[l,e("p",null,[t("一个案例 "),e("a",_,[t("https://joydig.com/2018/09/30/"),o(a)])])])}const x=c(s,[["render",d],["__file","cpp_googlestyle_static_global_var.html.vue"]]);export{x as default};