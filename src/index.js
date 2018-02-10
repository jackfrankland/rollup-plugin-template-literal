const rollupPluginutils = require('rollup-pluginutils');

module.exports = function templateLiteral(opts) {
  opts = {
    include: opts.include,
    exclude: opts.exclude || [],
    propsKey: opts.propsKey || 'props',
    tags: opts.tags || 'required',
  };

  if (!opts.include) {
    throw Error('include option is required')
  }

  if (!['off', 'enabled', 'required'].includes(opts.tags)) {
    throw Error('tags options has to be one of \'required\', \'optional\' or \'off\'');
  }

  const filter = rollupPluginutils.createFilter(
    opts.include,
    opts.exclude,
  );

  return {
    transform: function(source, id) {
      if (!filter(id)) {
        return;
      }
      
      return {
        code: transformSource(source, opts),
        map: {
          mappings: '',
        }
      };
    }
  };
}

function transformSource(source, opts) {
  return `
export default function(${opts.propsKey}, tag) {
  ${
    opts.tags === 'optional' ?
  `
  tag = tag ||
    (function(strs, ...exps) {
      return strs.reduce(function(res, curr) {
        var exp = exps.shift() || '';
        return res + curr + exp;
      }, '');
    });
  return tag\`${source}\`;
  ` :
    opts.tags === 'required' ?
  `
  return tag\`${source}\`;
  ` :
  `
  return \`${source}\`;
  `
  }
}
`;
}
