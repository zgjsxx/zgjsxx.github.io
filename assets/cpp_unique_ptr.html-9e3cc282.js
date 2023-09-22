const t=JSON.parse('{"key":"v-617c5d0a","path":"/posts/Program_language/cpp/cpp_unique_ptr.html","title":"c++智能指针之unique_ptr","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"c++智能指针之unique_ptr std::unique_ptr简介 std::unique_ptr是一种几乎和原始指针一样高效的智能指针，对所管理的指针资源拥有独占权。由C++11标准引入，用于替代C++98中过时的std::auto_ptr智能指针。相比而言，std::unique_ptr的优点有： 语义更清晰：std::auto_ptr进行拷贝的时候实际执行的是移动语义，但C++98中并没有定义出移动语义，所以使用的时候可能会违背直觉。而std::unique_ptr利用了C++11中新定义的移动语义，只允许移动操作，禁止拷贝操作，从而让语义更加清晰。 允许自定义删除器：由于std::unique_ptr将删除器作为自己的成员变量，所以传入自定义删除器之前需要在模板参数中指定删除器的类型std::unique_ptr&lt;T, D&gt; up(nullptr, deleter)。 支持STL容器：在C++98中，容器要求元素必须是可以拷贝的，比如«effective STL»中提到的，对容器中的元素进行std::sort时，会从区间中选一个元素拷贝为主元素（pivot），然后再对所有元素进行分区操作。但是std::auto_ptr的拷贝操作执行的却是移动语义，这样就会造成bug。在C++11中，STL容器是支持移动语义的，std::unique_ptr只提供移动操作删除了拷贝操作，并且移动操作是noexcept的（这一点很重要，因为STL容器有些操作需要保证强异常安全会要求要么用拷贝操作要么用无异常的移动操作）。只要不涉及到拷贝的容器操作，比如fill函数，那么std::unique_ptr作为容器元素是正确的。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_unique_ptr.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++智能指针之unique_ptr"}],["meta",{"property":"og:description","content":"c++智能指针之unique_ptr std::unique_ptr简介 std::unique_ptr是一种几乎和原始指针一样高效的智能指针，对所管理的指针资源拥有独占权。由C++11标准引入，用于替代C++98中过时的std::auto_ptr智能指针。相比而言，std::unique_ptr的优点有： 语义更清晰：std::auto_ptr进行拷贝的时候实际执行的是移动语义，但C++98中并没有定义出移动语义，所以使用的时候可能会违背直觉。而std::unique_ptr利用了C++11中新定义的移动语义，只允许移动操作，禁止拷贝操作，从而让语义更加清晰。 允许自定义删除器：由于std::unique_ptr将删除器作为自己的成员变量，所以传入自定义删除器之前需要在模板参数中指定删除器的类型std::unique_ptr&lt;T, D&gt; up(nullptr, deleter)。 支持STL容器：在C++98中，容器要求元素必须是可以拷贝的，比如«effective STL»中提到的，对容器中的元素进行std::sort时，会从区间中选一个元素拷贝为主元素（pivot），然后再对所有元素进行分区操作。但是std::auto_ptr的拷贝操作执行的却是移动语义，这样就会造成bug。在C++11中，STL容器是支持移动语义的，std::unique_ptr只提供移动操作删除了拷贝操作，并且移动操作是noexcept的（这一点很重要，因为STL容器有些操作需要保证强异常安全会要求要么用拷贝操作要么用无异常的移动操作）。只要不涉及到拷贝的容器操作，比如fill函数，那么std::unique_ptr作为容器元素是正确的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-07T06:42:02.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-07T06:42:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++智能指针之unique_ptr\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-07T06:42:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"std::unique_ptr简介","slug":"std-unique-ptr简介","link":"#std-unique-ptr简介","children":[]},{"level":2,"title":"unique_ptr的基本使用","slug":"unique-ptr的基本使用","link":"#unique-ptr的基本使用","children":[]},{"level":2,"title":"unique_ptr添加自定义删除器","slug":"unique-ptr添加自定义删除器","link":"#unique-ptr添加自定义删除器","children":[]},{"level":2,"title":"unique_ptr常用使用场景","slug":"unique-ptr常用使用场景","link":"#unique-ptr常用使用场景","children":[]},{"level":2,"title":"尽量使用std::make_unique","slug":"尽量使用std-make-unique","link":"#尽量使用std-make-unique","children":[]},{"level":2,"title":"将unique_ptr转为shared_ptr是容易的","slug":"将unique-ptr转为shared-ptr是容易的","link":"#将unique-ptr转为shared-ptr是容易的","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1693969299000,"updatedTime":1694068922000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":8}]},"readingTime":{"minutes":7.66,"words":2298},"filePathRelative":"posts/Program_language/cpp/cpp_unique_ptr.md","localizedDate":"2023年9月6日","excerpt":"<h1> c++智能指针之unique_ptr</h1>\\n<h2> std::unique_ptr简介</h2>\\n<p>std::unique_ptr是一种几乎和原始指针一样高效的智能指针，对所管理的指针资源拥有独占权。由C++11标准引入，用于替代C++98中过时的std::auto_ptr智能指针。相比而言，std::unique_ptr的优点有：</p>\\n<ul>\\n<li>语义更清晰：std::auto_ptr进行拷贝的时候实际执行的是移动语义，但C++98中并没有定义出移动语义，所以使用的时候可能会违背直觉。而std::unique_ptr利用了C++11中新定义的移动语义，只允许移动操作，禁止拷贝操作，从而让语义更加清晰。</li>\\n<li>允许自定义删除器：由于std::unique_ptr将删除器作为自己的成员变量，所以传入自定义删除器之前需要在模板参数中指定删除器的类型std::unique_ptr&lt;T, D&gt; up(nullptr, deleter)。</li>\\n<li>支持STL容器：在C++98中，容器要求元素必须是可以拷贝的，比如«effective STL»中提到的，对容器中的元素进行std::sort时，会从区间中选一个元素拷贝为主元素（pivot），然后再对所有元素进行分区操作。但是std::auto_ptr的拷贝操作执行的却是移动语义，这样就会造成bug。在C++11中，STL容器是支持移动语义的，std::unique_ptr只提供移动操作删除了拷贝操作，并且移动操作是noexcept的（这一点很重要，因为STL容器有些操作需要保证强异常安全会要求要么用拷贝操作要么用无异常的移动操作）。只要不涉及到拷贝的容器操作，比如fill函数，那么std::unique_ptr作为容器元素是正确的。</li>\\n</ul>","autoDesc":true}');export{t as data};