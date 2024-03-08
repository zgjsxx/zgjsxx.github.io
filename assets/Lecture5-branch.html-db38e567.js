const e=JSON.parse('{"key":"v-0a0aeea4","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture5-branch.html","title":"第五讲 跳转、比较、条件跳转","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第五讲 跳转、比较、条件跳转 汇编语言程序的结构 跳转 比较 cmp指令 cmps*指令(内存与内存的比较) test指令 其他指令 条件跳转的指令 跳转目标 跳转优化 转换 C/C++ 结构 if-else 链 嵌套的 if-else do-while循环 while 循环 break和continue 附录 课程资源","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture5-branch.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第五讲 跳转、比较、条件跳转"}],["meta",{"property":"og:description","content":"第五讲 跳转、比较、条件跳转 汇编语言程序的结构 跳转 比较 cmp指令 cmps*指令(内存与内存的比较) test指令 其他指令 条件跳转的指令 跳转目标 跳转优化 转换 C/C++ 结构 if-else 链 嵌套的 if-else do-while循环 while 循环 break和continue 附录 课程资源"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-08T10:01:27.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-08T10:01:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第五讲 跳转、比较、条件跳转\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T10:01:27.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"汇编语言程序的结构","slug":"汇编语言程序的结构","link":"#汇编语言程序的结构","children":[]},{"level":2,"title":"跳转","slug":"跳转","link":"#跳转","children":[]},{"level":2,"title":"比较","slug":"比较","link":"#比较","children":[{"level":3,"title":"cmp指令","slug":"cmp指令","link":"#cmp指令","children":[]},{"level":3,"title":"cmps*指令(内存与内存的比较)","slug":"cmps-指令-内存与内存的比较","link":"#cmps-指令-内存与内存的比较","children":[]},{"level":3,"title":"test指令","slug":"test指令","link":"#test指令","children":[]},{"level":3,"title":"其他指令","slug":"其他指令","link":"#其他指令","children":[]}]},{"level":2,"title":"条件跳转的指令","slug":"条件跳转的指令","link":"#条件跳转的指令","children":[{"level":3,"title":"跳转目标","slug":"跳转目标","link":"#跳转目标","children":[]},{"level":3,"title":"跳转优化","slug":"跳转优化","link":"#跳转优化","children":[]}]},{"level":2,"title":"转换 C/C++ 结构","slug":"转换-c-c-结构","link":"#转换-c-c-结构","children":[{"level":3,"title":"if-else 链","slug":"if-else-链","link":"#if-else-链","children":[]},{"level":3,"title":"嵌套的 if-else","slug":"嵌套的-if-else","link":"#嵌套的-if-else","children":[]},{"level":3,"title":"do-while循环","slug":"do-while循环","link":"#do-while循环","children":[]},{"level":3,"title":"while 循环","slug":"while-循环","link":"#while-循环","children":[]},{"level":3,"title":"break和continue","slug":"break和continue","link":"#break和continue","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"课程资源","slug":"课程资源","link":"#课程资源","children":[]}]}],"git":{"createdTime":1708924316000,"updatedTime":1709892087000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":17}]},"readingTime":{"minutes":18.92,"words":5677},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture5-branch.md","localizedDate":"2024年2月26日","excerpt":"<ul>\\n<li><a href=\\"#%E7%AC%AC%E4%BA%94%E8%AE%B2-%E8%B7%B3%E8%BD%AC%E6%AF%94%E8%BE%83%E6%9D%A1%E4%BB%B6%E8%B7%B3%E8%BD%AC\\">第五讲 跳转、比较、条件跳转</a>\\n<ul>\\n<li><a href=\\"#%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E7%A8%8B%E5%BA%8F%E7%9A%84%E7%BB%93%E6%9E%84\\">汇编语言程序的结构</a></li>\\n<li><a href=\\"#%E8%B7%B3%E8%BD%AC\\">跳转</a></li>\\n<li><a href=\\"#%E6%AF%94%E8%BE%83\\">比较</a>\\n<ul>\\n<li><a href=\\"#cmp%E6%8C%87%E4%BB%A4\\"><code>cmp</code>指令</a></li>\\n<li><a href=\\"#cmps%E6%8C%87%E4%BB%A4%E5%86%85%E5%AD%98%E4%B8%8E%E5%86%85%E5%AD%98%E7%9A%84%E6%AF%94%E8%BE%83\\"><code>cmps*</code>指令(内存与内存的比较)</a></li>\\n<li><a href=\\"#test%E6%8C%87%E4%BB%A4\\"><code>test</code>指令</a></li>\\n<li><a href=\\"#%E5%85%B6%E4%BB%96%E6%8C%87%E4%BB%A4\\">其他指令</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E6%9D%A1%E4%BB%B6%E8%B7%B3%E8%BD%AC%E7%9A%84%E6%8C%87%E4%BB%A4\\">条件跳转的指令</a>\\n<ul>\\n<li><a href=\\"#%E8%B7%B3%E8%BD%AC%E7%9B%AE%E6%A0%87\\">跳转目标</a></li>\\n<li><a href=\\"#%E8%B7%B3%E8%BD%AC%E4%BC%98%E5%8C%96\\">跳转优化</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E8%BD%AC%E6%8D%A2-cc-%E7%BB%93%E6%9E%84\\">转换 C/C++ 结构</a>\\n<ul>\\n<li><a href=\\"#if-else-%E9%93%BE\\">if-else 链</a></li>\\n<li><a href=\\"#%E5%B5%8C%E5%A5%97%E7%9A%84-if-else\\">嵌套的 <code>if-else</code></a></li>\\n<li><a href=\\"#do-while%E5%BE%AA%E7%8E%AF\\"><code>do-while</code>循环</a></li>\\n<li><a href=\\"#while-%E5%BE%AA%E7%8E%AF\\"><code>while</code> 循环</a></li>\\n<li><a href=\\"#break%E5%92%8Ccontinue\\"><code>break</code>和<code>continue</code></a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E9%99%84%E5%BD%95\\">附录</a>\\n<ul>\\n<li><a href=\\"#%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%BA%90\\">课程资源</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
