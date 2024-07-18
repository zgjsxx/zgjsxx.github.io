const e=JSON.parse('{"key":"v-bdf14f70","path":"/posts/Interview/linux.html","title":"Linux","lang":"zh-CN","frontmatter":{"category":["面经"],"tag":["Linux面经"],"description":"Linux 介绍几个GCC的优化参数 以下是一些常用的GCC优化参数： -O0禁用所有优化，编译速度最快，但代码运行速度最慢。 -O1启用基本优化，编译速度适中，代码运行速度适度提升。 -O3启用所有可用优化，编译速度最慢，代码运行速度最快。 -Os优化代码大小，编译速度较快，代码运行速度略微提升。 -0g优化调试体验，编译速度适中，代码运行速度略微提升。 其他常见优化参数： -march=指定目标体系架构，例如-march=native使用当前机器的最佳指令集 -mtune=指定目标处理器，例如-mtune=corei7使用针对Corei7处理器的优化。 -format-frame-pointer省略帧指针，减少代码大小，但可能影响测试。 -finline-functions内联函数，减少函数调用开销 -fno-builtin禁用内建函数，例如memcpy、strlen等。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Interview/linux.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux"}],["meta",{"property":"og:description","content":"Linux 介绍几个GCC的优化参数 以下是一些常用的GCC优化参数： -O0禁用所有优化，编译速度最快，但代码运行速度最慢。 -O1启用基本优化，编译速度适中，代码运行速度适度提升。 -O3启用所有可用优化，编译速度最慢，代码运行速度最快。 -Os优化代码大小，编译速度较快，代码运行速度略微提升。 -0g优化调试体验，编译速度适中，代码运行速度略微提升。 其他常见优化参数： -march=指定目标体系架构，例如-march=native使用当前机器的最佳指令集 -mtune=指定目标处理器，例如-mtune=corei7使用针对Corei7处理器的优化。 -format-frame-pointer省略帧指针，减少代码大小，但可能影响测试。 -finline-functions内联函数，减少函数调用开销 -fno-builtin禁用内建函数，例如memcpy、strlen等。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T08:45:51.000Z"}],["meta",{"property":"article:tag","content":"Linux面经"}],["meta",{"property":"article:modified_time","content":"2024-07-18T08:45:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-18T08:45:51.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"介绍几个GCC的优化参数","slug":"介绍几个gcc的优化参数","link":"#介绍几个gcc的优化参数","children":[]},{"level":2,"title":"在shell中，使用source执行一个脚本和不使用source执行一个脚本有什么区别？","slug":"在shell中-使用source执行一个脚本和不使用source执行一个脚本有什么区别","link":"#在shell中-使用source执行一个脚本和不使用source执行一个脚本有什么区别","children":[]}],"git":{"createdTime":1712727340000,"updatedTime":1721292351000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.62,"words":486},"filePathRelative":"posts/Interview/linux.md","localizedDate":"2024年4月10日","excerpt":"<h1> Linux</h1>\\n<h2> 介绍几个GCC的优化参数</h2>\\n<p>以下是一些常用的GCC优化参数：</p>\\n<ul>\\n<li>-O0禁用所有优化，编译速度最快，但代码运行速度最慢。</li>\\n<li>-O1启用基本优化，编译速度适中，代码运行速度适度提升。</li>\\n<li>-O3启用所有可用优化，编译速度最慢，代码运行速度最快。</li>\\n<li>-Os优化代码大小，编译速度较快，代码运行速度略微提升。</li>\\n<li>-0g优化调试体验，编译速度适中，代码运行速度略微提升。</li>\\n</ul>\\n<p>其他常见优化参数：</p>\\n<ul>\\n<li>-march=指定目标体系架构，例如<code>-march=native</code>使用当前机器的最佳指令集</li>\\n<li>-mtune=指定目标处理器，例如<code>-mtune=corei7</code>使用针对Corei7处理器的优化。</li>\\n<li>-format-frame-pointer省略帧指针，减少代码大小，但可能影响测试。</li>\\n<li>-finline-functions内联函数，减少函数调用开销</li>\\n<li>-fno-builtin禁用内建函数，例如memcpy、strlen等。</li>\\n</ul>","autoDesc":true}');export{e as data};
