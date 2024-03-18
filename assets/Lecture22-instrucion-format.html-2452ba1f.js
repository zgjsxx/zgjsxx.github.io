const e=JSON.parse('{"key":"v-197fb5b5","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture22-instrucion-format.html","title":"第二十二讲 指令格式","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第二十二讲 指令格式 MIPS32指令格式 R(Register)指令格式 I(Imediate)指令格式 J(jump)指令格式 例子 x86-64操作码的格式 前缀 ModR/M 和 SIB 字段 REX 前缀 操作码 例子 附录","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture22-instrucion-format.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第二十二讲 指令格式"}],["meta",{"property":"og:description","content":"第二十二讲 指令格式 MIPS32指令格式 R(Register)指令格式 I(Imediate)指令格式 J(jump)指令格式 例子 x86-64操作码的格式 前缀 ModR/M 和 SIB 字段 REX 前缀 操作码 例子 附录"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-18T03:15:23.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-18T03:15:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第二十二讲 指令格式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-18T03:15:23.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"MIPS32指令格式","slug":"mips32指令格式","link":"#mips32指令格式","children":[{"level":3,"title":"R(Register)指令格式","slug":"r-register-指令格式","link":"#r-register-指令格式","children":[]},{"level":3,"title":"I(Imediate)指令格式","slug":"i-imediate-指令格式","link":"#i-imediate-指令格式","children":[]},{"level":3,"title":"J(jump)指令格式","slug":"j-jump-指令格式","link":"#j-jump-指令格式","children":[]},{"level":3,"title":"例子","slug":"例子","link":"#例子","children":[]}]},{"level":2,"title":"x86-64操作码的格式","slug":"x86-64操作码的格式","link":"#x86-64操作码的格式","children":[{"level":3,"title":"前缀","slug":"前缀","link":"#前缀","children":[]},{"level":3,"title":"ModR/M 和 SIB 字段","slug":"modr-m-和-sib-字段","link":"#modr-m-和-sib-字段","children":[]},{"level":3,"title":"REX 前缀","slug":"rex-前缀","link":"#rex-前缀","children":[]},{"level":3,"title":"操作码","slug":"操作码","link":"#操作码","children":[]},{"level":3,"title":"例子","slug":"例子-1","link":"#例子-1","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]}],"git":{"createdTime":1709629879000,"updatedTime":1710731723000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":7}]},"readingTime":{"minutes":11.89,"words":3567},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture22-instrucion-format.md","localizedDate":"2024年3月5日","excerpt":"<ul>\\n<li><a href=\\"#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%8C%E8%AE%B2-%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F\\">第二十二讲 指令格式</a>\\n<ul>\\n<li><a href=\\"#mips32%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F\\">MIPS32指令格式</a>\\n<ul>\\n<li><a href=\\"#rregister%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F\\">R(Register)指令格式</a></li>\\n<li><a href=\\"#iimediate%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F\\">I(Imediate)指令格式</a></li>\\n<li><a href=\\"#jjump%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F\\">J(jump)指令格式</a></li>\\n<li><a href=\\"#%E4%BE%8B%E5%AD%90\\">例子</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#x86-64%E6%93%8D%E4%BD%9C%E7%A0%81%E7%9A%84%E6%A0%BC%E5%BC%8F\\">x86-64操作码的格式</a>\\n<ul>\\n<li><a href=\\"#%E5%89%8D%E7%BC%80\\">前缀</a></li>\\n<li><a href=\\"#modrm-%E5%92%8C-sib-%E5%AD%97%E6%AE%B5\\">ModR/M 和 SIB 字段</a></li>\\n<li><a href=\\"#rex-%E5%89%8D%E7%BC%80\\">REX 前缀</a></li>\\n<li><a href=\\"#%E6%93%8D%E4%BD%9C%E7%A0%81\\">操作码</a></li>\\n<li><a href=\\"#%E4%BE%8B%E5%AD%90-1\\">例子</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E9%99%84%E5%BD%95\\">附录</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
