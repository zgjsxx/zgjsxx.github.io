const e=JSON.parse('{"key":"v-2cedf15b","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-namei.html","title":"Linux-0.11 文件系统namei.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 文件系统namei.c详解 模块简介 namei.c是整个linux-0.11版本的内核中最长的函数，总长度为700+行。其核心是namei函数，即根据文件路径寻找对应的i节点。 除此以外，该模块还包含一些创建目录，删除目录，创建目录项等系统调用。 在接触本模块的具体函数之前，可以回顾一下不同的i节点，这将对理解本模块的函数非常有帮助。 对于目录节点，其i_zone[0]指向的block中存放的是dir_entry。 对于文件节点，其i_zone[0] - i_zone[6]是直接寻址块。i_zone[7]是一次间接寻址块，i_zone[8]是二次间接寻址块。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-namei.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 文件系统namei.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 文件系统namei.c详解 模块简介 namei.c是整个linux-0.11版本的内核中最长的函数，总长度为700+行。其核心是namei函数，即根据文件路径寻找对应的i节点。 除此以外，该模块还包含一些创建目录，删除目录，创建目录项等系统调用。 在接触本模块的具体函数之前，可以回顾一下不同的i节点，这将对理解本模块的函数非常有帮助。 对于目录节点，其i_zone[0]指向的block中存放的是dir_entry。 对于文件节点，其i_zone[0] - i_zone[6]是直接寻址块。i_zone[7]是一次间接寻址块，i_zone[8]是二次间接寻址块。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T02:57:13.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-18T02:57:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 文件系统namei.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-18T02:57:13.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"permission","slug":"permission","link":"#permission","children":[]},{"level":3,"title":"match","slug":"match","link":"#match","children":[]},{"level":3,"title":"find_entry","slug":"find-entry","link":"#find-entry","children":[]},{"level":3,"title":"add_entry","slug":"add-entry","link":"#add-entry","children":[]},{"level":3,"title":"get_dir","slug":"get-dir","link":"#get-dir","children":[]},{"level":3,"title":"dir_namei","slug":"dir-namei","link":"#dir-namei","children":[]},{"level":3,"title":"namei","slug":"namei","link":"#namei","children":[]},{"level":3,"title":"open_namei","slug":"open-namei","link":"#open-namei","children":[]},{"level":3,"title":"sys_mknod","slug":"sys-mknod","link":"#sys-mknod","children":[]},{"level":3,"title":"sys_mkdir","slug":"sys-mkdir","link":"#sys-mkdir","children":[]},{"level":3,"title":"empty_dir","slug":"empty-dir","link":"#empty-dir","children":[]},{"level":3,"title":"sys_rmdir","slug":"sys-rmdir","link":"#sys-rmdir","children":[]},{"level":3,"title":"sys_unlink","slug":"sys-unlink","link":"#sys-unlink","children":[]},{"level":3,"title":"sys_link","slug":"sys-link","link":"#sys-link","children":[]}]},{"level":2,"title":"Q & A","slug":"q-a","link":"#q-a","children":[]}],"git":{"createdTime":1680686630000,"updatedTime":1681786633000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":11},{"name":"zgjsxx","email":"119160625@qq.com","commits":1}]},"readingTime":{"minutes":11.66,"words":3497},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-fs-namei.md","localizedDate":"2023年4月5日","excerpt":"<h1> Linux-0.11 文件系统namei.c详解</h1>\\n<h2> 模块简介</h2>\\n<p>namei.c是整个linux-0.11版本的内核中最长的函数，总长度为700+行。其核心是<strong>namei函数</strong>，即根据文件路径寻找对应的i节点。 除此以外，该模块还包含一些创建目录，删除目录，创建目录项等系统调用。</p>\\n<p>在接触本模块的具体函数之前，可以回顾一下不同的i节点，这将对理解本模块的函数非常有帮助。</p>\\n<p>对于目录节点，其<code>i_zone[0]</code>指向的block中存放的是dir_entry。</p>\\n<p>对于文件节点，其<code>i_zone[0] - i_zone[6]</code>是直接寻址块。<code>i_zone[7]</code>是一次间接寻址块，<code>i_zone[8]</code>是二次间接寻址块。</p>","autoDesc":true}');export{e as data};
