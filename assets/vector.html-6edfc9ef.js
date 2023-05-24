const e=JSON.parse('{"key":"v-0c109628","path":"/posts/open_source_project/MyTinySTL/vector.html","title":"vector","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","MyTinySTL"],"description":"vector vector是STL中使用最为广泛的容器之一，vector的动态内存的管理功能给我们写程序带来了很大的便利性。本节就通过分析MyTinySTL中关于vector的源码了解其实现原理。 分析 vector数据部分的定义 下面是vector这个模板类数据部分的定义。可以看到public部分都是一些类型定义， 例如迭代器类型，const迭代器类型，reverse迭代器类型， const reverse迭代器类型等等。 private部分比较简单，就是三个原始指针类型的迭代器。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/vector.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"vector"}],["meta",{"property":"og:description","content":"vector vector是STL中使用最为广泛的容器之一，vector的动态内存的管理功能给我们写程序带来了很大的便利性。本节就通过分析MyTinySTL中关于vector的源码了解其实现原理。 分析 vector数据部分的定义 下面是vector这个模板类数据部分的定义。可以看到public部分都是一些类型定义， 例如迭代器类型，const迭代器类型，reverse迭代器类型， const reverse迭代器类型等等。 private部分比较简单，就是三个原始指针类型的迭代器。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T03:29:32.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"MyTinySTL"}],["meta",{"property":"article:modified_time","content":"2023-05-24T03:29:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vector\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-24T03:29:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"vector数据部分的定义","slug":"vector数据部分的定义","link":"#vector数据部分的定义","children":[]},{"level":3,"title":"vector() noexcept","slug":"vector-noexcept","link":"#vector-noexcept","children":[]},{"level":3,"title":"try_init","slug":"try-init","link":"#try-init","children":[]},{"level":3,"title":"push_back","slug":"push-back","link":"#push-back","children":[]}]}],"git":{"createdTime":1684898972000,"updatedTime":1684898972000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.92,"words":876},"filePathRelative":"posts/open_source_project/MyTinySTL/vector.md","localizedDate":"2023年5月24日","excerpt":"<h1> vector</h1>\\n<p>vector是STL中使用最为广泛的容器之一，vector的动态内存的管理功能给我们写程序带来了很大的便利性。本节就通过分析MyTinySTL中关于vector的源码了解其实现原理。</p>\\n<h2> 分析</h2>\\n<h3> vector数据部分的定义</h3>\\n<p>下面是vector这个模板类数据部分的定义。可以看到public部分都是一些类型定义， 例如迭代器类型，const迭代器类型，reverse迭代器类型， const reverse迭代器类型等等。</p>\\n<p>private部分比较简单，就是三个<strong>原始指针</strong>类型的迭代器。</p>","autoDesc":true}');export{e as data};
