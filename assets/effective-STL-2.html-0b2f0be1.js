const e=JSON.parse('{"key":"v-0f2cdccc","path":"/posts/Program_language/cpp/effective-STL/effective-STL-2.html","title":"effective STL-02 小心对\\"容器无关代码\\"的幻想","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective STL读书笔记"],"description":"effective STL-02 小心对\\"容器无关代码\\"的幻想 STL是建立在泛化的基础上的。 数组泛化为容器，参数泛化所包含对象的类型。 函数泛化为算法，参数泛化所用的迭代器类型。 指针泛化为迭代器，参数泛化所指向的对象的类型。 不同容器是不同的，优点和缺点大不相同，不要去对它们做包装 序列容器支持push_front、push_back，但关联容器不支持 关联容器提供logN复杂度的lower_bound、upper_bound和equal_range，（N叉树） 不同的容器是不同的，优缺点有重大不同。它们不被设计成可互换的，而且你做不了什么包装的工作","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-STL/effective-STL-2.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective STL-02 小心对\\"容器无关代码\\"的幻想"}],["meta",{"property":"og:description","content":"effective STL-02 小心对\\"容器无关代码\\"的幻想 STL是建立在泛化的基础上的。 数组泛化为容器，参数泛化所包含对象的类型。 函数泛化为算法，参数泛化所用的迭代器类型。 指针泛化为迭代器，参数泛化所指向的对象的类型。 不同容器是不同的，优点和缺点大不相同，不要去对它们做包装 序列容器支持push_front、push_back，但关联容器不支持 关联容器提供logN复杂度的lower_bound、upper_bound和equal_range，（N叉树） 不同的容器是不同的，优缺点有重大不同。它们不被设计成可互换的，而且你做不了什么包装的工作"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-01T03:03:25.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective STL读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-06-01T03:03:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective STL-02 小心对\\\\\\"容器无关代码\\\\\\"的幻想\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-01T03:03:25.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1685588605000,"updatedTime":1685588605000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":1.65,"words":496},"filePathRelative":"posts/Program_language/cpp/effective-STL/effective-STL-2.md","localizedDate":"2023年6月1日","excerpt":"<h1> effective STL-02 小心对\\"容器无关代码\\"的幻想</h1>\\n<p>STL是建立在泛化的基础上的。</p>\\n<ul>\\n<li>数组泛化为容器，参数泛化所包含对象的类型。</li>\\n<li>函数泛化为算法，参数泛化所用的迭代器类型。</li>\\n<li>指针泛化为迭代器，参数泛化所指向的对象的类型。</li>\\n</ul>\\n<p>不同容器是不同的，优点和缺点大不相同，不要去对它们做包装</p>\\n<ul>\\n<li>序列容器支持push_front、push_back，但关联容器不支持</li>\\n<li>关联容器提供logN复杂度的lower_bound、upper_bound和equal_range，（N叉树）</li>\\n<li>不同的容器是不同的，优缺点有重大不同。它们不被设计成可互换的，而且你做不了什么包装的工作</li>\\n</ul>","autoDesc":true}');export{e as data};