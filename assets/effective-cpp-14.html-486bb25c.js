const e=JSON.parse('{"key":"v-48285c53","path":"/posts/Program_language/cpp/effective-cpp-14.html","title":"effective c++ 14 资源管理类中小心copying行为","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 14 资源管理类中小心copying行为 本节还是继续讨论RAII这个设计模式。 分析 上节中讨论了RAII设计模式，但是该模式其实是有一些需要关注的点。本节讨论的便是RAII类中的复制行为需要特别关注。 通常RAII类对于copy行为实行两种方法，抑制copy和施行引用计数。 例如像互斥锁的RAII类型， 我们是不愿意其被复制的。 如果可以被复制，就意味着互斥锁可能被unlock两次，这不是我们想要的。因此对于互斥锁这样的类型，通常将其copy构造函数和赋值运算符delete掉， 避免其复制行为。delete方法在item-06中有讨论过。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp-14.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 14 资源管理类中小心copying行为"}],["meta",{"property":"og:description","content":"effective c++ 14 资源管理类中小心copying行为 本节还是继续讨论RAII这个设计模式。 分析 上节中讨论了RAII设计模式，但是该模式其实是有一些需要关注的点。本节讨论的便是RAII类中的复制行为需要特别关注。 通常RAII类对于copy行为实行两种方法，抑制copy和施行引用计数。 例如像互斥锁的RAII类型， 我们是不愿意其被复制的。 如果可以被复制，就意味着互斥锁可能被unlock两次，这不是我们想要的。因此对于互斥锁这样的类型，通常将其copy构造函数和赋值运算符delete掉， 避免其复制行为。delete方法在item-06中有讨论过。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T02:20:02.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T02:20:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 14 资源管理类中小心copying行为\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T02:20:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683512895000,"updatedTime":1683771602000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.26,"words":379},"filePathRelative":"posts/Program_language/cpp/effective-cpp-14.md","localizedDate":"2023年5月8日","excerpt":"<h1> effective c++ 14 资源管理类中小心copying行为</h1>\\n<p>本节还是继续讨论RAII这个设计模式。</p>\\n<h2> 分析</h2>\\n<p>上节中讨论了RAII设计模式，但是该模式其实是有一些需要关注的点。本节讨论的便是RAII类中的复制行为需要特别关注。</p>\\n<p>通常RAII类对于copy行为实行两种方法，<strong>抑制copy</strong>和<strong>施行引用计数</strong>。</p>\\n<p>例如像互斥锁的RAII类型， 我们是不愿意其被复制的。 如果可以被复制，就意味着互斥锁可能被unlock两次，这不是我们想要的。因此对于互斥锁这样的类型，通常将其copy构造函数和赋值运算符delete掉， 避免其复制行为。delete方法在item-06中有讨论过。</p>","autoDesc":true}');export{e as data};
