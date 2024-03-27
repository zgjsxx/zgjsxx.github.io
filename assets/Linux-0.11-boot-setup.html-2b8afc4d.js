const e=JSON.parse('{"key":"v-0dd9b637","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-boot-setup.html","title":"Linux-0.11 boot目录setup.s详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 boot目录setup.s详解 模块简介 过程详解 step1：打印硬件信息 step2：重新搬运system的位置 step3：设置IDT和GDT step4：打开A20地址线 step5: 切换32位保护模式 跳转到system.s中运行 附录 1.Intel 8259A编程 参考文献","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-boot-setup.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 boot目录setup.s详解"}],["meta",{"property":"og:description","content":"Linux-0.11 boot目录setup.s详解 模块简介 过程详解 step1：打印硬件信息 step2：重新搬运system的位置 step3：设置IDT和GDT step4：打开A20地址线 step5: 切换32位保护模式 跳转到system.s中运行 附录 1.Intel 8259A编程 参考文献"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T08:22:23.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2024-03-27T08:22:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 boot目录setup.s详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-27T08:22:23.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"过程详解","slug":"过程详解","link":"#过程详解","children":[{"level":3,"title":"step1：打印硬件信息","slug":"step1-打印硬件信息","link":"#step1-打印硬件信息","children":[]},{"level":3,"title":"step2：重新搬运system的位置","slug":"step2-重新搬运system的位置","link":"#step2-重新搬运system的位置","children":[]},{"level":3,"title":"step3：设置IDT和GDT","slug":"step3-设置idt和gdt","link":"#step3-设置idt和gdt","children":[]},{"level":3,"title":"step4：打开A20地址线","slug":"step4-打开a20地址线","link":"#step4-打开a20地址线","children":[]},{"level":3,"title":"step5: 切换32位保护模式","slug":"step5-切换32位保护模式","link":"#step5-切换32位保护模式","children":[]},{"level":3,"title":"跳转到system.s中运行","slug":"跳转到system-s中运行","link":"#跳转到system-s中运行","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"1.Intel 8259A编程","slug":"_1-intel-8259a编程","link":"#_1-intel-8259a编程","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":1680686630000,"updatedTime":1711527743000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":20}]},"readingTime":{"minutes":11.1,"words":3329},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-boot-setup.md","localizedDate":"2023年4月5日","excerpt":"<ul>\\n<li><a href=\\"#linux-011-boot%E7%9B%AE%E5%BD%95setups%E8%AF%A6%E8%A7%A3\\">Linux-0.11 boot目录setup.s详解</a>\\n<ul>\\n<li><a href=\\"#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B\\">模块简介</a></li>\\n<li><a href=\\"#%E8%BF%87%E7%A8%8B%E8%AF%A6%E8%A7%A3\\">过程详解</a>\\n<ul>\\n<li><a href=\\"#step1%E6%89%93%E5%8D%B0%E7%A1%AC%E4%BB%B6%E4%BF%A1%E6%81%AF\\">step1：打印硬件信息</a></li>\\n<li><a href=\\"#step2%E9%87%8D%E6%96%B0%E6%90%AC%E8%BF%90system%E7%9A%84%E4%BD%8D%E7%BD%AE\\">step2：重新搬运system的位置</a></li>\\n<li><a href=\\"#step3%E8%AE%BE%E7%BD%AEidt%E5%92%8Cgdt\\">step3：设置IDT和GDT</a></li>\\n<li><a href=\\"#step4%E6%89%93%E5%BC%80a20%E5%9C%B0%E5%9D%80%E7%BA%BF\\">step4：打开A20地址线</a></li>\\n<li><a href=\\"#step5-%E5%88%87%E6%8D%A232%E4%BD%8D%E4%BF%9D%E6%8A%A4%E6%A8%A1%E5%BC%8F\\">step5: 切换32位保护模式</a></li>\\n<li><a href=\\"#%E8%B7%B3%E8%BD%AC%E5%88%B0systems%E4%B8%AD%E8%BF%90%E8%A1%8C\\">跳转到system.s中运行</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E9%99%84%E5%BD%95\\">附录</a>\\n<ul>\\n<li><a href=\\"#1intel-8259a%E7%BC%96%E7%A8%8B\\">1.Intel 8259A编程</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE\\">参考文献</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
