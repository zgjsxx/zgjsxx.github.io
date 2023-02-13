const e=JSON.parse('{"key":"v-fb9d32f0","path":"/posts/Linux/Linux-0.11-fs-inode.html","title":"Linux-0.11 文件系统inode.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 文件系统inode.c详解 Linux-0.11中使用的文件系统为minix， inode.c中的函数和该文件系统强关联。 inode节点在文件系统中与文件相关联，一个文件的就由一个inode来管理，这个inode节点将记录文件的权限，大小， 文件具体存储的逻辑块位置等等信息。 read_inode static void read_inode(struct m_inode * inode);","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11-fs-inode.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 文件系统inode.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 文件系统inode.c详解 Linux-0.11中使用的文件系统为minix， inode.c中的函数和该文件系统强关联。 inode节点在文件系统中与文件相关联，一个文件的就由一个inode来管理，这个inode节点将记录文件的权限，大小， 文件具体存储的逻辑块位置等等信息。 read_inode static void read_inode(struct m_inode * inode);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-13T06:26:42.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-02-13T06:26:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 文件系统inode.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-13T06:26:42.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"read_inode","slug":"read-inode","link":"#read-inode","children":[]},{"level":2,"title":"write_inode","slug":"write-inode","link":"#write-inode","children":[]},{"level":2,"title":"iget","slug":"iget","link":"#iget","children":[]},{"level":2,"title":"iput","slug":"iput","link":"#iput","children":[]},{"level":2,"title":"get_empty_inode","slug":"get-empty-inode","link":"#get-empty-inode","children":[]},{"level":2,"title":"_bmap","slug":"bmap","link":"#bmap","children":[]},{"level":2,"title":"create_block","slug":"create-block","link":"#create-block","children":[]},{"level":2,"title":"bmap","slug":"bmap-1","link":"#bmap-1","children":[]},{"level":2,"title":"sync_inodes","slug":"sync-inodes","link":"#sync-inodes","children":[]},{"level":2,"title":"invalidate_inodes","slug":"invalidate-inodes","link":"#invalidate-inodes","children":[]},{"level":2,"title":"get_pipe_inode","slug":"get-pipe-inode","link":"#get-pipe-inode","children":[]},{"level":2,"title":"lock_inode","slug":"lock-inode","link":"#lock-inode","children":[]},{"level":2,"title":"wait_on_inode","slug":"wait-on-inode","link":"#wait-on-inode","children":[]},{"level":2,"title":"unlock_inode","slug":"unlock-inode","link":"#unlock-inode","children":[]}],"git":{"createdTime":1676269602000,"updatedTime":1676269602000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":8.21,"words":2464},"filePathRelative":"posts/Linux/Linux-0.11-fs-inode.md","localizedDate":"2023年2月13日","excerpt":"<h1> Linux-0.11 文件系统inode.c详解</h1>\\n<p>Linux-0.11中使用的文件系统为minix， inode.c中的函数和该文件系统强关联。</p>\\n<p>inode节点在文件系统中与文件相关联，一个文件的就由一个inode来管理，这个inode节点将记录文件的权限，大小， 文件具体存储的逻辑块位置等等信息。</p>\\n<h2> read_inode</h2>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">read_inode</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">m_inode</span> <span class=\\"token operator\\">*</span> inode<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
