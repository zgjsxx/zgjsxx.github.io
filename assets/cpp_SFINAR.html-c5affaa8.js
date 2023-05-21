const t=JSON.parse('{"key":"v-3c87a07e","path":"/posts/Program_language/cpp/cpp_SFINAR.html","title":"SFINAE是个什么东西？","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"SFINAE是个什么东西？ 概念 SFINAE是Substitution Failure Is Not An Error的缩写，翻译过来的意思是替换失败并不是一个错误。 SFINAE是模板元编程中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。 因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。 这个点是c++模板匹配的一个规则，通常情况下，使用该规则，我们可以判断某个类是否有否定义了内嵌类型。下面通过例子来进行讲解。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_SFINAR.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"SFINAE是个什么东西？"}],["meta",{"property":"og:description","content":"SFINAE是个什么东西？ 概念 SFINAE是Substitution Failure Is Not An Error的缩写，翻译过来的意思是替换失败并不是一个错误。 SFINAE是模板元编程中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。 因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。 这个点是c++模板匹配的一个规则，通常情况下，使用该规则，我们可以判断某个类是否有否定义了内嵌类型。下面通过例子来进行讲解。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-21T06:34:17.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-21T06:34:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SFINAE是个什么东西？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-21T06:34:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[]}],"git":{"createdTime":1684650857000,"updatedTime":1684650857000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"posts/Program_language/cpp/cpp_SFINAR.md","localizedDate":"2023年5月21日","excerpt":"<h1> SFINAE是个什么东西？</h1>\\n<h2> 概念</h2>\\n<p>SFINAE是Substitution Failure Is Not An Error的缩写，翻译过来的意思是替换失败并不是一个错误。</p>\\n<p><strong>SFINAE</strong>是<strong>模板元编程</strong>中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。</p>\\n<p>因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。</p>\\n<p>这个点是c++模板匹配的一个规则，通常情况下，使用该规则，我们可以判断某个类是否有否定义了内嵌类型。下面通过例子来进行讲解。</p>","autoDesc":true}');export{t as data};
