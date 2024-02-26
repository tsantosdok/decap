module.exports = {
    experimental: {
      outputFileTracingIncludes: {
        '/admin': ['./resources/**/*'],
      },
    },
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            },
            {
            test: /\.yml$/,
            use: 'js-yaml-loader',
            }
        )
        return cfg
    },
    trailingSlash: true,
}