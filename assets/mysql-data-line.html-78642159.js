const t=JSON.parse('{"key":"v-29447cd9","path":"/posts/database/mysql/mysql-data-line.html","title":"mysql中的行格式之compact格式分析","lang":"zh-CN","frontmatter":{"category":["Mysql"],"description":"mysql中的行格式之compact格式分析 mysql行格式 所谓行格式，就是指mysql一行数据的存储格式。 InnoDB 储存引擎支持有四种行储存格式：Compact、Redundant、Dynamic 和 Compressed。 Redundant是很古老的行格式了，因为占用空间最多，导致内存碎片化最严重，比较低效，现在基本上已经不用了， Compact是MySQL 5.0之后引入的行记录存储方式，是一种紧凑的行格式，设计的初衷就是为了让一个数据页中可以存放更多的行记录，从 MySQL 5.1 版本之后，行格式默认设置成 Compact。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/database/mysql/mysql-data-line.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"mysql中的行格式之compact格式分析"}],["meta",{"property":"og:description","content":"mysql中的行格式之compact格式分析 mysql行格式 所谓行格式，就是指mysql一行数据的存储格式。 InnoDB 储存引擎支持有四种行储存格式：Compact、Redundant、Dynamic 和 Compressed。 Redundant是很古老的行格式了，因为占用空间最多，导致内存碎片化最严重，比较低效，现在基本上已经不用了， Compact是MySQL 5.0之后引入的行记录存储方式，是一种紧凑的行格式，设计的初衷就是为了让一个数据页中可以存放更多的行记录，从 MySQL 5.1 版本之后，行格式默认设置成 Compact。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-22T02:10:40.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-22T02:10:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql中的行格式之compact格式分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-22T02:10:40.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"mysql行格式","slug":"mysql行格式","link":"#mysql行格式","children":[]},{"level":2,"title":"mysql表的数据存储在哪里？","slug":"mysql表的数据存储在哪里","link":"#mysql表的数据存储在哪里","children":[]},{"level":2,"title":"COMPACT 行格式长什么样？","slug":"compact-行格式长什么样","link":"#compact-行格式长什么样","children":[]},{"level":2,"title":"实验分析ibd文件格式","slug":"实验分析ibd文件格式","link":"#实验分析ibd文件格式","children":[]}],"git":{"createdTime":1689759293000,"updatedTime":1700619040000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":5.89,"words":1766},"filePathRelative":"posts/database/mysql/mysql-data-line.md","localizedDate":"2023年7月19日","excerpt":"<h1> mysql中的行格式之compact格式分析</h1>\\n<h2> mysql行格式</h2>\\n<p>所谓行格式，就是指mysql一行数据的存储格式。</p>\\n<p>InnoDB 储存引擎支持有四种行储存格式：Compact、Redundant、Dynamic 和 Compressed。</p>\\n<p>Redundant是很古老的行格式了，因为占用空间最多，导致内存碎片化最严重，比较低效，现在基本上已经不用了，</p>\\n<p>Compact是MySQL 5.0之后引入的行记录存储方式，是一种紧凑的行格式，设计的初衷就是为了让一个数据页中可以存放更多的行记录，从 MySQL 5.1 版本之后，行格式默认设置成 Compact。</p>","autoDesc":true}');export{t as data};