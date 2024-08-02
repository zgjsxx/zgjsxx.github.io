import{_ as e,V as t,W as r,a0 as p}from"./framework-9a29aaa0.js";const i={},l=p('<h1 id="network" tabindex="-1"><a class="header-anchor" href="#network" aria-hidden="true">#</a> Network</h1><h2 id="time-wait的状态是在哪一端产生的-它的作用是什么" tabindex="-1"><a class="header-anchor" href="#time-wait的状态是在哪一端产生的-它的作用是什么" aria-hidden="true">#</a> TIME_WAIT的状态是在哪一端产生的？它的作用是什么？</h2><p>TIME_WAIT状态在主动关闭端产生。主要作用如下：</p><ul><li>可靠的关闭连接。TIME_WAIT状态确保了最终的ACK（确认）消息能够被成功接收。根据TCP协议，当一端（主动关闭连接的一端）发送FIN（终止）请求后，进入FIN_WAIT_1状态，然后等待对方的ACK消息并进入FIN_WAIT_2状态。对方接收到FIN后，回复ACK并发送自己的FIN请求。主动关闭连接的一端收到对方的FIN后，回复ACK，并进入TIME_WAIT状态。TIME_WAIT状态持续两个最大报文段寿命（MSL, Maximum Segment Lifetime），确保最后的ACK能被对方接收，即使对方的FIN因为网络问题需要重传。</li><li>防止旧连接的数据干扰新连接。TIME_WAIT状态的另一个重要作用是防止在网络中滞留的旧连接数据包干扰新连接。由于TCP连接是通过五元组（源IP地址、源端口、目标IP地址、目标端口、协议）唯一标识的，TIME_WAIT状态的持续时间（通常为2倍的MSL）足够确保旧连接的所有数据包在新连接建立前都已经过期和丢弃。这样可以避免新连接接收到旧连接遗留的数据包，从而保持数据传输的正确性和完整性。</li></ul><h2 id="https加密过程是怎样的" tabindex="-1"><a class="header-anchor" href="#https加密过程是怎样的" aria-hidden="true">#</a> https加密过程是怎样的？</h2><p>HTTPS（Hypertext Transfer Protocol Secure）是通过在HTTP协议基础上加入SSL/TLS协议来实现安全通信的。以下是HTTPS加密过程的详细描述：</p><p><strong>1.客户端向服务器发起请求</strong></p><p>客户端（通常是浏览器）向服务器发送一个HTTPS请求，要求建立一个安全连接。</p><p>请求包含客户端支持的SSL/TLS版本、加密算法、生成的随机数等信息。</p><p><strong>2.服务器响应客户端请求</strong></p><p>服务器选择SSL/TLS版本和加密算法，并生成一个随机数。</p><p>服务器将其SSL证书发送给客户端。该证书包含服务器的公钥和服务器的身份信息（由可信的证书颁发机构（CA）签名）。</p><p><strong>3.验证服务器证书</strong></p><p>客户端验证服务器证书的有效性，包括验证证书是否由可信的CA签发，证书是否过期，证书中的域名是否匹配请求的域名。</p><p>如果验证成功，客户端将生成一个新的随机数（称为Pre-Master Secret）。</p><p><strong>4.生成会话密钥</strong></p><p>客户端使用服务器的公钥加密Pre-Master Secret，并将其发送给服务器。</p><p>服务器使用其私钥解密Pre-Master Secret。</p><p>客户端和服务器现在都拥有三个随机数：客户端的随机数、服务器的随机数和Pre-Master Secret。双方使用这三个随机数通过约定的算法生成会话密钥（Session Key）。</p><p><strong>5.加密通信</strong></p><p>客户端和服务器使用会话密钥进行对称加密和解密，确保数据在传输过程中不被窃听或篡改。</p><p><strong>6.结束会话</strong></p><p>当通信结束时，客户端和服务器可以通过发送“关闭连接”的消息来终止安全连接。此时，会话密钥将被销毁，避免其被滥用。</p><p><strong>加密技术概述</strong></p><ul><li><p>对称加密：使用相同的密钥进行加密和解密。会话密钥就是对称加密的密钥。</p></li><li><p>非对称加密：使用一对密钥（公钥和私钥），公钥用于加密，私钥用于解密。客户端使用服务器的公钥加密Pre-Master Secret，服务器使用其私钥解密。</p></li><li><p>散列函数：用于生成消息摘要，确保数据完整性。</p></li></ul><p><strong>SSL/TLS握手过程</strong></p><ul><li>客户端Hello：客户端发起连接请求，提供支持的协议版本、加密算法和随机数。</li><li>服务器Hello：服务器回应选择的协议版本、加密算法和随机数，并发送证书。</li><li>服务器Key Exchange（如果需要）：服务器可能会发送额外的公钥交换信息。</li><li>客户端Key Exchange：客户端发送加密的Pre-Master Secret。</li><li>Change Cipher Spec：客户端和服务器交换“更改密码规范”消息，表示后续消息将使用协商的会话密钥加密。</li><li>Finished：双方发送“完成”消息，验证握手成功。</li></ul><p><strong>数据传输加密</strong></p><p>握手过程完成后，客户端和服务器之间的所有数据传输都将使用生成的会话密钥进行加密。</p><p><strong>安全性</strong></p><p>HTTPS通过加密和证书验证机制，提供了三种主要的安全保障：</p><ul><li>加密：防止数据被窃听。</li><li>完整性：防止数据在传输过程中被篡改。</li><li>身份验证：确保通信双方的身份真实。</li></ul><p>通过上述过程，HTTPS实现了安全的数据传输，保护了用户的隐私和数据的完整性。</p>',33),n=[l];function s(a,o){return t(),r("div",null,n)}const c=e(i,[["render",s],["__file","network.html.vue"]]);export{c as default};
