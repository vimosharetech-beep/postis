    window.addEventListener('DOMContentLoaded', () => {
      const replacements = {
        'abc.com': 'ryb.com',
        'fastdl.icu': 'fastdl.zip',
        'vcloud.lol': 'vcloud.zip',
      };

      const regex = new RegExp(Object.keys(replacements).join('|'), 'g');
      const replaceAll = text => text.replace(regex, match => replacements[match]);

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while ((node = walker.nextNode())) {
        if (regex.test(node.nodeValue)) {
          node.nodeValue = replaceAll(node.nodeValue);
        }
      }

      document.querySelectorAll('*').forEach(el => {
        for (const attr of el.attributes) {
          const val = attr.value;
          if (regex.test(val)) {
            el.setAttribute(attr.name, replaceAll(val));
          }
        }
      });

      console.log('✅ Domain replacements done');

    });

