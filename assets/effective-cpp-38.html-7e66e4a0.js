const e=JSON.parse('{"key":"v-3b4be67f","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-38.html","title":"effective c++ 38 通过复合塑模出has-a或者根据某物实现出","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 38 通过复合塑模出has-a或者根据某物实现出 前面介绍过类和类之间的一种关系-继承。本节将介绍另一种类和类的关系-组合。其含义就是在某个类型中嵌入一个另外一个类的对象。 通过组合，我们可以实现出has-a或者is-implemented-in-terms-of。 分析 has-a的关系也很好理解， 例如一个Person类型，其中含有一些属性地址， 电话号码， 如下所示： class Address{}； class PhoneNumber {}； class Person{ public： private： std::string name; Address address; PhoneNumber voicenumber; PhoneNumber faxNumber; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-38.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 38 通过复合塑模出has-a或者根据某物实现出"}],["meta",{"property":"og:description","content":"effective c++ 38 通过复合塑模出has-a或者根据某物实现出 前面介绍过类和类之间的一种关系-继承。本节将介绍另一种类和类的关系-组合。其含义就是在某个类型中嵌入一个另外一个类的对象。 通过组合，我们可以实现出has-a或者is-implemented-in-terms-of。 分析 has-a的关系也很好理解， 例如一个Person类型，其中含有一些属性地址， 电话号码， 如下所示： class Address{}； class PhoneNumber {}； class Person{ public： private： std::string name; Address address; PhoneNumber voicenumber; PhoneNumber faxNumber; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-16T03:19:53.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-16T03:19:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 38 通过复合塑模出has-a或者根据某物实现出\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-16T03:19:53.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1684207193000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":1.21,"words":362},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-38.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 38 通过复合塑模出has-a或者根据某物实现出</h1>\\n<p>前面介绍过类和类之间的一种关系-继承。本节将介绍另一种类和类的关系-组合。其含义就是在某个类型中嵌入一个另外一个类的对象。</p>\\n<p>通过组合，我们可以实现出has-a或者is-implemented-in-terms-of。</p>\\n<h2> 分析</h2>\\n<p>has-a的关系也很好理解， 例如一个Person类型，其中含有一些属性地址， 电话号码， 如下所示：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Address</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>；\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">PhoneNumber</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>；\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span>：\\n<span class=\\"token keyword\\">private</span>：\\n    std<span class=\\"token double-colon punctuation\\">::</span>string name<span class=\\"token punctuation\\">;</span>\\n    Address address<span class=\\"token punctuation\\">;</span>\\n    PhoneNumber voicenumber<span class=\\"token punctuation\\">;</span>\\n    PhoneNumber faxNumber<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
