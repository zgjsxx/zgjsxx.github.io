const t=JSON.parse('{"key":"v-250d4089","path":"/posts/Program_language/cpp/cpp-template/cpp_SFINAE.html","title":"C++模板之SFINAE","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"C++模板之SFINAE 概念 SFINAE是Substitution Failure Is Not An Error的缩写，翻译过来的意思是替换失败并不是一个错误。 SFINAE是模板元编程中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。 因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp-template/cpp_SFINAE.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"C++模板之SFINAE"}],["meta",{"property":"og:description","content":"C++模板之SFINAE 概念 SFINAE是Substitution Failure Is Not An Error的缩写，翻译过来的意思是替换失败并不是一个错误。 SFINAE是模板元编程中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。 因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-27T08:12:39.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-27T08:12:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C++模板之SFINAE\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-27T08:12:39.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[]}],"git":{"createdTime":1709021559000,"updatedTime":1709021559000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.12,"words":636},"filePathRelative":"posts/Program_language/cpp/cpp-template/cpp_SFINAE.md","localizedDate":"2024年2月27日","excerpt":"<h1> C++模板之SFINAE</h1>\\n<h2> 概念</h2>\\n<p><strong>SFINAE</strong>是<strong>Substitution Failure Is Not An Error</strong>的缩写，翻译过来的意思是替换失败并不是一个错误。</p>\\n<p><strong>SFINAE</strong>是<strong>模板元编程</strong>中常见的一种技巧，如果模板实例化后的某个模板函数（模板类）对该调用无效，那么将继续寻找其他重载决议，而不是引发一个编译错误。</p>\\n<p>因此一句话概括SFINAE，就是模板匹配过程中会尝试各个模板，直到所有模板都匹配失败，才会认为是真正的错误。</p>","autoDesc":true}');export{t as data};
