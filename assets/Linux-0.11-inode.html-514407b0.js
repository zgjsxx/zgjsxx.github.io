const e=JSON.parse('{"key":"v-4d9d6454","path":"/posts/Linux/Linux-0.11-inode.html","title":"Linux-0.11 inode.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"Tags":["Linux"],"description":"Linux-0.11 inode.c详解 read_inode static void read_inode(struct m_inode * inode);","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11-inode.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 inode.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 inode.c详解 read_inode static void read_inode(struct m_inode * inode);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-11T13:24:50.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-11T13:24:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 inode.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-11T13:24:50.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"read_inode","slug":"read-inode","link":"#read-inode","children":[]},{"level":2,"title":"iget(int dev,int nr)","slug":"iget-int-dev-int-nr","link":"#iget-int-dev-int-nr","children":[]},{"level":2,"title":"iput","slug":"iput","link":"#iput","children":[]},{"level":2,"title":"write_inode","slug":"write-inode","link":"#write-inode","children":[]},{"level":2,"title":"get_empty_inode","slug":"get-empty-inode","link":"#get-empty-inode","children":[]},{"level":2,"title":"_bmap","slug":"bmap","link":"#bmap","children":[]},{"level":2,"title":"create_block","slug":"create-block","link":"#create-block","children":[]},{"level":2,"title":"bmap","slug":"bmap-1","link":"#bmap-1","children":[]},{"level":2,"title":"sync_inodes","slug":"sync-inodes","link":"#sync-inodes","children":[]},{"level":2,"title":"invalidate_inodes","slug":"invalidate-inodes","link":"#invalidate-inodes","children":[]},{"level":2,"title":"lock_inode","slug":"lock-inode","link":"#lock-inode","children":[]},{"level":2,"title":"wait_on_inode","slug":"wait-on-inode","link":"#wait-on-inode","children":[]},{"level":2,"title":"unlock_inode","slug":"unlock-inode","link":"#unlock-inode","children":[]}],"git":{"createdTime":1675848914000,"updatedTime":1676121890000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":3.18,"words":954},"filePathRelative":"posts/Linux/Linux-0.11-inode.md","localizedDate":"2023年2月8日","excerpt":"<h1> Linux-0.11 inode.c详解</h1>\\n<h2> read_inode</h2>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">read_inode</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">m_inode</span> <span class=\\"token operator\\">*</span> inode<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
