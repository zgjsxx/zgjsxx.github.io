const t=JSON.parse('{"key":"v-c9504c8e","path":"/posts/Interview/cpp.html","title":"c++面经","lang":"zh-CN","frontmatter":{"category":["面经"],"tag":["c++面经"],"description":"c++面经 c++基础 const关键字的作用 const成员的初始化方法 const成员引用如何初始化 委托构造和继承构造是什么？ const成员函数内部需要修改成员变量如何解决？ 虚函数的返回值可以不一样吗？ dynamic_cast失败会怎么样？ 多重继承时，指向子类的指针转化为基类，指针会变吗? 带有虚函数的多重继承的内存分布 static方法可以是const吗? 请实现一个strcpy方法 内存堆栈对比，分别有什么特点？它们的分配效率如何？ ++i和i++哪个效率更高？ 如何禁用拷贝构造函数 std::future和std::promise的作用 位域是什么？有哪些注意点 c++11的新特性有哪些？ 类和对象 什么是RTTI STL map和unordered_map的区别? 各自使用场景是什么？ 参考","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Interview/cpp.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++面经"}],["meta",{"property":"og:description","content":"c++面经 c++基础 const关键字的作用 const成员的初始化方法 const成员引用如何初始化 委托构造和继承构造是什么？ const成员函数内部需要修改成员变量如何解决？ 虚函数的返回值可以不一样吗？ dynamic_cast失败会怎么样？ 多重继承时，指向子类的指针转化为基类，指针会变吗? 带有虚函数的多重继承的内存分布 static方法可以是const吗? 请实现一个strcpy方法 内存堆栈对比，分别有什么特点？它们的分配效率如何？ ++i和i++哪个效率更高？ 如何禁用拷贝构造函数 std::future和std::promise的作用 位域是什么？有哪些注意点 c++11的新特性有哪些？ 类和对象 什么是RTTI STL map和unordered_map的区别? 各自使用场景是什么？ 参考"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-21T05:46:25.000Z"}],["meta",{"property":"article:tag","content":"c++面经"}],["meta",{"property":"article:modified_time","content":"2024-08-21T05:46:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++面经\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-21T05:46:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"c++基础","slug":"c-基础","link":"#c-基础","children":[{"level":3,"title":"const关键字的作用","slug":"const关键字的作用","link":"#const关键字的作用","children":[]},{"level":3,"title":"const成员的初始化方法","slug":"const成员的初始化方法","link":"#const成员的初始化方法","children":[]},{"level":3,"title":"const成员引用如何初始化","slug":"const成员引用如何初始化","link":"#const成员引用如何初始化","children":[]},{"level":3,"title":"委托构造和继承构造是什么？","slug":"委托构造和继承构造是什么","link":"#委托构造和继承构造是什么","children":[]},{"level":3,"title":"const成员函数内部需要修改成员变量如何解决？","slug":"const成员函数内部需要修改成员变量如何解决","link":"#const成员函数内部需要修改成员变量如何解决","children":[]},{"level":3,"title":"虚函数的返回值可以不一样吗？","slug":"虚函数的返回值可以不一样吗","link":"#虚函数的返回值可以不一样吗","children":[]},{"level":3,"title":"dynamic_cast失败会怎么样？","slug":"dynamic-cast失败会怎么样","link":"#dynamic-cast失败会怎么样","children":[]},{"level":3,"title":"多重继承时，指向子类的指针转化为基类，指针会变吗?","slug":"多重继承时-指向子类的指针转化为基类-指针会变吗","link":"#多重继承时-指向子类的指针转化为基类-指针会变吗","children":[]},{"level":3,"title":"带有虚函数的多重继承的内存分布","slug":"带有虚函数的多重继承的内存分布","link":"#带有虚函数的多重继承的内存分布","children":[]},{"level":3,"title":"static方法可以是const吗?","slug":"static方法可以是const吗","link":"#static方法可以是const吗","children":[]},{"level":3,"title":"请实现一个strcpy方法","slug":"请实现一个strcpy方法","link":"#请实现一个strcpy方法","children":[]},{"level":3,"title":"内存堆栈对比，分别有什么特点？它们的分配效率如何？","slug":"内存堆栈对比-分别有什么特点-它们的分配效率如何","link":"#内存堆栈对比-分别有什么特点-它们的分配效率如何","children":[]},{"level":3,"title":"++i和i++哪个效率更高？","slug":"i和i-哪个效率更高","link":"#i和i-哪个效率更高","children":[]},{"level":3,"title":"如何禁用拷贝构造函数","slug":"如何禁用拷贝构造函数","link":"#如何禁用拷贝构造函数","children":[]},{"level":3,"title":"std::future和std::promise的作用","slug":"std-future和std-promise的作用","link":"#std-future和std-promise的作用","children":[]},{"level":3,"title":"位域是什么？有哪些注意点","slug":"位域是什么-有哪些注意点","link":"#位域是什么-有哪些注意点","children":[]},{"level":3,"title":"c++11的新特性有哪些？","slug":"c-11的新特性有哪些","link":"#c-11的新特性有哪些","children":[]}]},{"level":2,"title":"类和对象","slug":"类和对象","link":"#类和对象","children":[{"level":3,"title":"什么是RTTI","slug":"什么是rtti","link":"#什么是rtti","children":[]}]},{"level":2,"title":"STL","slug":"stl","link":"#stl","children":[{"level":3,"title":"map和unordered_map的区别? 各自使用场景是什么？","slug":"map和unordered-map的区别-各自使用场景是什么","link":"#map和unordered-map的区别-各自使用场景是什么","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1683791573000,"updatedTime":1724219185000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":15},{"name":"zgjsxx","email":"119160625@qq.com","commits":1}]},"readingTime":{"minutes":37.31,"words":11193},"filePathRelative":"posts/Interview/cpp.md","localizedDate":"2023年5月11日","excerpt":"<ul>\\n<li><a href=\\"#c%E9%9D%A2%E7%BB%8F\\">c++面经</a>\\n<ul>\\n<li><a href=\\"#c%E5%9F%BA%E7%A1%80\\">c++基础</a>\\n<ul>\\n<li><a href=\\"#const%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E4%BD%9C%E7%94%A8\\">const关键字的作用</a></li>\\n<li><a href=\\"#const%E6%88%90%E5%91%98%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E6%96%B9%E6%B3%95\\">const成员的初始化方法</a></li>\\n<li><a href=\\"#const%E6%88%90%E5%91%98%E5%BC%95%E7%94%A8%E5%A6%82%E4%BD%95%E5%88%9D%E5%A7%8B%E5%8C%96\\">const成员引用如何初始化</a></li>\\n<li><a href=\\"#%E5%A7%94%E6%89%98%E6%9E%84%E9%80%A0%E5%92%8C%E7%BB%A7%E6%89%BF%E6%9E%84%E9%80%A0%E6%98%AF%E4%BB%80%E4%B9%88\\">委托构造和继承构造是什么？</a></li>\\n<li><a href=\\"#const%E6%88%90%E5%91%98%E5%87%BD%E6%95%B0%E5%86%85%E9%83%A8%E9%9C%80%E8%A6%81%E4%BF%AE%E6%94%B9%E6%88%90%E5%91%98%E5%8F%98%E9%87%8F%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3\\">const成员函数内部需要修改成员变量如何解决？</a></li>\\n<li><a href=\\"#%E8%99%9A%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC%E5%8F%AF%E4%BB%A5%E4%B8%8D%E4%B8%80%E6%A0%B7%E5%90%97\\">虚函数的返回值可以不一样吗？</a></li>\\n<li><a href=\\"#dynamic_cast%E5%A4%B1%E8%B4%A5%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7\\">dynamic_cast失败会怎么样？</a></li>\\n<li><a href=\\"#%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF%E6%97%B6%E6%8C%87%E5%90%91%E5%AD%90%E7%B1%BB%E7%9A%84%E6%8C%87%E9%92%88%E8%BD%AC%E5%8C%96%E4%B8%BA%E5%9F%BA%E7%B1%BB%E6%8C%87%E9%92%88%E4%BC%9A%E5%8F%98%E5%90%97\\">多重继承时，指向子类的指针转化为基类，指针会变吗?</a></li>\\n<li><a href=\\"#%E5%B8%A6%E6%9C%89%E8%99%9A%E5%87%BD%E6%95%B0%E7%9A%84%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF%E7%9A%84%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83\\">带有虚函数的多重继承的内存分布</a></li>\\n<li><a href=\\"#static%E6%96%B9%E6%B3%95%E5%8F%AF%E4%BB%A5%E6%98%AFconst%E5%90%97\\">static方法可以是const吗?</a></li>\\n<li><a href=\\"#%E8%AF%B7%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAstrcpy%E6%96%B9%E6%B3%95\\">请实现一个strcpy方法</a></li>\\n<li><a href=\\"#%E5%86%85%E5%AD%98%E5%A0%86%E6%A0%88%E5%AF%B9%E6%AF%94%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9%E5%AE%83%E4%BB%AC%E7%9A%84%E5%88%86%E9%85%8D%E6%95%88%E7%8E%87%E5%A6%82%E4%BD%95\\">内存堆栈对比，分别有什么特点？它们的分配效率如何？</a></li>\\n<li><a href=\\"#i%E5%92%8Ci%E5%93%AA%E4%B8%AA%E6%95%88%E7%8E%87%E6%9B%B4%E9%AB%98\\">++i和i++哪个效率更高？</a></li>\\n<li><a href=\\"#%E5%A6%82%E4%BD%95%E7%A6%81%E7%94%A8%E6%8B%B7%E8%B4%9D%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0\\">如何禁用拷贝构造函数</a></li>\\n<li><a href=\\"#stdfuture%E5%92%8Cstdpromise%E7%9A%84%E4%BD%9C%E7%94%A8\\">std::future和std::promise的作用</a></li>\\n<li><a href=\\"#%E4%BD%8D%E5%9F%9F%E6%98%AF%E4%BB%80%E4%B9%88%E6%9C%89%E5%93%AA%E4%BA%9B%E6%B3%A8%E6%84%8F%E7%82%B9\\">位域是什么？有哪些注意点</a></li>\\n<li><a href=\\"#c11%E7%9A%84%E6%96%B0%E7%89%B9%E6%80%A7%E6%9C%89%E5%93%AA%E4%BA%9B\\">c++11的新特性有哪些？</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E7%B1%BB%E5%92%8C%E5%AF%B9%E8%B1%A1\\">类和对象</a>\\n<ul>\\n<li><a href=\\"#%E4%BB%80%E4%B9%88%E6%98%AFrtti\\">什么是RTTI</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#stl\\">STL</a>\\n<ul>\\n<li><a href=\\"#map%E5%92%8Cunordered_map%E7%9A%84%E5%8C%BA%E5%88%AB-%E5%90%84%E8%87%AA%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E6%98%AF%E4%BB%80%E4%B9%88\\">map和unordered_map的区别? 各自使用场景是什么？</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E5%8F%82%E8%80%83\\">参考</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{t as data};
