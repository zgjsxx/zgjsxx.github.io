import{_ as i,V as s,W as p,Z as n,a0 as e}from"./framework-c954d91f.js";const a={},r=e(`<p>很多人刚开始学习大模型时，都会默认一个理解：</p><p>我们输入一段文字，GPT 就是在“读”这段文字。</p><p>比如你问它：</p><p>What is c plus plus</p><p>从人的角度看，这就是一句普通的问题。<br> 但从模型的角度看，事情并没有这么简单。</p><p>GPT 并不是直接处理原始文字。<br> 在文字真正进入模型之前，会先经过一个非常关键的步骤：</p><p><strong>Tokenization，也就是分词。</strong></p><p>简单来说，Tokenizer 会先把文本切成一个个 <strong>Token</strong>，然后再把每个 Token 转换成对应的数字编号，也就是 <strong>Token ID</strong>。</p><p>模型真正处理的，并不是我们肉眼看到的文字，而是 Token ID 经过 Embedding 层映射出来的向量。</p><p>整个过程可以简单理解为：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>人类输入的文字
   ↓
Tokenizer 切分成 Token
   ↓
Token 转换成 Token ID
   ↓
Embedding 转换成向量
   ↓
送入 Transformer 模型计算
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个过程听起来有点抽象，所以今天介绍一个非常直观的工具：<strong>Tiktokenizer</strong>。</p><p>它可以把 GPT 的分词过程可视化出来，让我们看到一段文本在进入模型之前，究竟被拆成了什么样子。</p>`,13),d=e(`<figure><img src="https://cdn.nlark.com/yuque/0/2026/png/26683070/1779082798116-d3488666-6053-4747-990a-58b698d16668.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在图中，选择的是 <code>gpt-4o</code> 模型，输入了两条消息：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>System: You are a helpful assistant
User: What is c plus plus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从人的角度看，这只是两句很短的话。</p><p>但在 Tiktokenizer 里可以看到，它并不是被简单地当成普通文本处理，而是被转换成了一段带有聊天结构的 Token 序列。</p><p>里面不仅包含我们输入的文字，还包含一些特殊标记，例如：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>&lt;|im_start|&gt;
&lt;|im_sep|&gt;
&lt;|im_end|&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些特殊标记用来表示消息开始、角色分隔、消息结束等结构信息。</p><p>也就是说，GPT 看到的并不只是：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>What is c plus plus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而是一个包含 <strong>system、user、assistant 角色结构</strong> 的完整输入序列。</p><p>这也是很多人容易忽略的一点：</p><p><strong>ChatGPT 的输入，不只是你打进去的那句话，还包括角色、分隔符、历史消息和上下文结构。</strong></p><p>图里最直观的地方，是右侧那一串彩色的小块。</p><p>每一个颜色块都代表一个被切分出来的 Token。<br> 下方那一串数字，则是这些 Token 对应的 Token ID。</p><p>也就是说，我们输入的文字并不会直接进入模型，而是会先被 tokenizer 拆分、编号，再交给后面的 embedding 层转换成向量。</p><p>这也是理解大模型输入机制时很关键的一点：</p><p><strong>模型看到的不是“文字”，而是由 Token ID 转换而来的向量。</strong></p><p>所以，Tokenizer 不只是“把文字切开”，它更像是大模型输入层的第一道转换器：</p><p><strong>把人类能读懂的文本，转换成模型能计算的数字序列。</strong></p><p>除了查看分词结果，Tiktokenizer 还有一个很实用的功能：可以切换不同模型或编码器。</p>`,21),l=e(`<figure><img src="https://cdn.nlark.com/yuque/0/2026/png/26683070/1779082807233-9d0f4d08-1e31-41c3-b80d-7a9ca781cc3b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在右上角的下拉框里，可以看到很多模型或编码器选项，比如：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>gpt-4o
gpt-4-1106-preview
gpt-3.5-turbo
cl100k_base
o200k_base
DeepSeek-R1
Qwen2.5-72B
Llama-3
CodeLlama
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个功能很有用。</p><p>因为不同模型使用的 tokenizer 可能不同。<br> 同一段文本，放到不同模型下，切出来的 Token 数量和 Token ID 都可能不一样。</p><p>比如中文、英文、代码、JSON、Markdown，这些内容在不同 tokenizer 下的切分方式可能会有明显差异。</p><p>这也是为什么我们不能简单地用“字数”来估算大模型输入长度。</p><p>对大模型来说，真正重要的不是字符数，而是 <strong>Token 数</strong>。</p><p>理解 Tokenizer 之后，很多大模型相关问题都会变得更清楚。</p><p>比如，为什么 Prompt 越长，调用成本越高？</p><p>因为模型处理的是 Token。输入 Token 越多，通常意味着计算成本越高。</p><p>为什么上下文窗口有限？</p><p>因为所谓的 8K、32K、128K 上下文，本质上指的是模型最多能处理多少 Token，而不是多少个中文字或英文单词。</p><p>为什么做 RAG、Agent、多轮对话时要控制上下文长度？</p><p>因为系统提示词、历史对话、检索内容、工具返回结果，都会一起占用 Token 空间。</p><p>如果 Token 太多，就会挤占上下文窗口，甚至导致关键信息被截断。</p><p>所以，Tiktokenizer 不是一个简单的“数字数工具”。</p><p>它更像是一个帮助我们理解大模型输入机制的可视化窗口。</p><p>你可以用它做几个小实验：</p><p>把一段中文放进去，看它被切成多少 Token。<br> 把一段英文放进去，对比单词数和 Token 数。<br> 把一段代码放进去，观察空格、缩进、符号会不会占 Token。<br> 切换不同模型，比较同一段文本的分词差异。<br> 把自己的 Prompt 放进去，看看实际消耗了多少 Token。</p><p>当你真正看过 Tokenizer 的结果之后，就会明白一句话：</p><p><strong>人类看到的是文字，模型看到的是 Token。</strong></p><p>而 <strong>Tiktokenizer</strong>，就是一个帮我们看见 GPT 输入世界的小工具。</p>`,23);function o(t,c){return s(),p("div",null,[r,n(" 这是一张图片，ocr 内容为： "),d,n(" 这是一张图片，ocr 内容为： "),l])}const v=i(a,[["render",o],["__file","介绍一个超直观的 Token 可视化工具：Tiktokenizer.html.vue"]]);export{v as default};
