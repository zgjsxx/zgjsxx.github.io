const t=JSON.parse('{"key":"v-c9504c8e","path":"/posts/Interview/cpp.html","title":"c++面经","lang":"zh-CN","frontmatter":{"category":["面经"],"tag":["c++面经"],"description":"c++面经 c++基础 内存堆栈对比，分别有什么特点？它们的分配效率如何？ 栈（Stack） 特点： 内存分配方式：栈是一个连续的内存区域，内存分配和释放遵循后进先出（LIFO，Last In First Out）原则。 管理方式：由编译器自动管理，无需手动控制。函数调用时，栈帧会自动分配，函数返回时，栈帧会自动释放。 生命周期：变量的生命周期与其所在的作用域一致，当作用域结束时，变量的内存会自动释放。 内存大小：栈的大小通常较小，并且在程序启动时确定。大多数系统的栈大小限制在几MB至几十MB之间。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Interview/cpp.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++面经"}],["meta",{"property":"og:description","content":"c++面经 c++基础 内存堆栈对比，分别有什么特点？它们的分配效率如何？ 栈（Stack） 特点： 内存分配方式：栈是一个连续的内存区域，内存分配和释放遵循后进先出（LIFO，Last In First Out）原则。 管理方式：由编译器自动管理，无需手动控制。函数调用时，栈帧会自动分配，函数返回时，栈帧会自动释放。 生命周期：变量的生命周期与其所在的作用域一致，当作用域结束时，变量的内存会自动释放。 内存大小：栈的大小通常较小，并且在程序启动时确定。大多数系统的栈大小限制在几MB至几十MB之间。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T09:15:43.000Z"}],["meta",{"property":"article:tag","content":"c++面经"}],["meta",{"property":"article:modified_time","content":"2024-07-22T09:15:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++面经\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-22T09:15:43.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"c++基础","slug":"c-基础","link":"#c-基础","children":[{"level":3,"title":"内存堆栈对比，分别有什么特点？它们的分配效率如何？","slug":"内存堆栈对比-分别有什么特点-它们的分配效率如何","link":"#内存堆栈对比-分别有什么特点-它们的分配效率如何","children":[]},{"level":3,"title":"++i和i++哪个效率更高？","slug":"i和i-哪个效率更高","link":"#i和i-哪个效率更高","children":[]},{"level":3,"title":"c++中const的作用","slug":"c-中const的作用","link":"#c-中const的作用","children":[]},{"level":3,"title":"如何禁用拷贝构造函数","slug":"如何禁用拷贝构造函数","link":"#如何禁用拷贝构造函数","children":[]}]},{"level":2,"title":"类和对象","slug":"类和对象","link":"#类和对象","children":[]},{"level":2,"title":"STL","slug":"stl","link":"#stl","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1683791573000,"updatedTime":1721639743000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":6}]},"readingTime":{"minutes":4.6,"words":1379},"filePathRelative":"posts/Interview/cpp.md","localizedDate":"2023年5月11日","excerpt":"<h1> c++面经</h1>\\n<h2> c++基础</h2>\\n<h3> 内存堆栈对比，分别有什么特点？它们的分配效率如何？</h3>\\n<p><strong>栈（Stack）</strong></p>\\n<p>特点：</p>\\n<ul>\\n<li>内存分配方式：栈是一个连续的内存区域，内存分配和释放遵循后进先出（LIFO，Last In First Out）原则。</li>\\n<li>管理方式：由编译器自动管理，无需手动控制。函数调用时，栈帧会自动分配，函数返回时，栈帧会自动释放。</li>\\n<li>生命周期：变量的生命周期与其所在的作用域一致，当作用域结束时，变量的内存会自动释放。</li>\\n<li>内存大小：栈的大小通常较小，并且在程序启动时确定。大多数系统的栈大小限制在几MB至几十MB之间。</li>\\n</ul>","autoDesc":true}');export{t as data};
