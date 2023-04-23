const e=JSON.parse('{"key":"v-eabbd2ca","path":"/posts/Program_language/C__/cpp_singleton_summarize.html","title":"c++中单例模式总结","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"c++中单例模式总结 通常而言，c++的单例模式通常有如下一些实现办法： 普通懒汉 加锁懒汉 静态内部变量 饿汉单例 std::call_once单例 普通懒汉 对于普通懒汉： 构造函数和析构函数应该为private类型，禁止外部构造和析构 拷贝构造函数和赋值运算符应为private类型或者加上** = delete**标记，禁止外部拷贝和赋值，确保单例的唯一性 Singleton的有一个静态的函数getInstance用于获取静态对象。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/C__/cpp_singleton_summarize.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++中单例模式总结"}],["meta",{"property":"og:description","content":"c++中单例模式总结 通常而言，c++的单例模式通常有如下一些实现办法： 普通懒汉 加锁懒汉 静态内部变量 饿汉单例 std::call_once单例 普通懒汉 对于普通懒汉： 构造函数和析构函数应该为private类型，禁止外部构造和析构 拷贝构造函数和赋值运算符应为private类型或者加上** = delete**标记，禁止外部拷贝和赋值，确保单例的唯一性 Singleton的有一个静态的函数getInstance用于获取静态对象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-20T03:15:18.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-20T03:15:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++中单例模式总结\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-20T03:15:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"普通懒汉","slug":"普通懒汉","link":"#普通懒汉","children":[]},{"level":2,"title":"加锁懒汉","slug":"加锁懒汉","link":"#加锁懒汉","children":[]},{"level":2,"title":"静态内部变量","slug":"静态内部变量","link":"#静态内部变量","children":[]},{"level":2,"title":"饿汉单例","slug":"饿汉单例","link":"#饿汉单例","children":[]},{"level":2,"title":"std::call_once单例","slug":"std-call-once单例","link":"#std-call-once单例","children":[]}],"git":{"createdTime":1681887230000,"updatedTime":1681960518000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":2.1,"words":631},"filePathRelative":"posts/Program_language/C++/cpp_singleton_summarize.md","localizedDate":"2023年4月19日","excerpt":"<h1> c++中单例模式总结</h1>\\n<p>通常而言，c++的单例模式通常有如下一些实现办法：</p>\\n<ul>\\n<li>普通懒汉</li>\\n<li>加锁懒汉</li>\\n<li>静态内部变量</li>\\n<li>饿汉单例</li>\\n<li>std::call_once单例</li>\\n</ul>\\n<h2> 普通懒汉</h2>\\n<p>对于普通懒汉：</p>\\n<ul>\\n<li><strong>构造函数和析构函数</strong>应该为<strong>private</strong>类型，禁止外部构造和析构</li>\\n<li><strong>拷贝构造函数</strong>和<strong>赋值运算符</strong>应为<strong>private</strong>类型或者加上** = delete**标记，禁止外部拷贝和赋值，确保单例的唯一性</li>\\n<li>Singleton的有一个静态的函数getInstance用于获取静态对象。</li>\\n</ul>","autoDesc":true}');export{e as data};