import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import React, { useState, forwardRef, useEffect } from 'react';

const Control = forwardRef(({ onChange, forID, value, classNameWrapper }, ref) => {
  const [importedComponent, setImportedComponent] = useState(null);
  const [cmsLocales, setCmsLocales] = useState(null);
  const [valueObj, setValueObj] = useState(typeof value !== "object" ? JSON.parse(value) : value);
  const [MdComp, setMdComp] = useState(null);

  const handleToggle = () => {
    setValueObj({ ...valueObj, enable: !valueObj.enable });
  };

  const handleChange = (e) => {
    console.log("teste handleChange >>>>", e.target.id)
    setValueObj({ ...valueObj, [e.target.id]: e.target.value });
  };

  const handleMD = (e) => {
    setValueObj({ ...valueObj, md: e});
  };
  
  useEffect(() => {
    onChange(JSON.stringify(valueObj))
  }, [valueObj]);

  useEffect(() => {
    const importComponent = async () => {
      const module_md = await import('decap-cms-widget-markdown');
      const module_cms_core = await import('decap-cms-core');
      const locales = await import('decap-cms-locales');

      console.log("Testezada 0 >>>", module_cms_core.default.registerLocale('pt', locales.pt))

      setImportedComponent(module_md);
      setCmsLocales(locales)
    };

    importComponent();
  }, []);

  
  useEffect(() => {
    if (importedComponent && cmsLocales) {
      const MdControl = importedComponent.default.Widget()?.controlComponent;
      if (MdControl) {
        let mymdMap = Map({
          modes: List(['rich_text', 'raw']),
        });
        
        let editorComponents = new Map();

        const MdCompWrapper = (
          <MdControl
            onChange={handleMD}
            onAddAsset={() => ({})}
            getAsset={() => ({})}
            getRemarkPlugins={() => ({})}
            classNameWrapper="Teste"
            editorControl={Function}
            field={mymdMap}
            getEditorComponents={() => {return editorComponents}}
            value={value.md}
            t={(a) => {
              return eval('cmsLocales.pt.'+a)}
            }
          />
        );

        setMdComp(MdCompWrapper);
      }
    }
  }, [importedComponent]);
  
  useEffect(() => {
    if (cmsLocales) {
      console.log("Testezada 3 >>>", eval('cmsLocales.pt.'+'editor.editorWidgets.markdown.richText'))
    }
  }, [cmsLocales]);

  return (
    <div id={forID}>
      <button onClick={handleToggle}>
        {valueObj.enable ? 'Habilitar Teste AB' : 'Desabilitar Teste AB'}
      </button>
      <input
        ref={ref}
        type="text"
        className={classNameWrapper}
        value={valueObj.title || ''}
        onChange={handleChange}
        placeholder='Título'
        id='title'
      />
      <input
        ref={ref}
        type="text"
        className={classNameWrapper}
        value={valueObj.button || ''}
        onChange={handleChange}
        placeholder='Texto do Botão'
        id='button'
      />
      <input
        ref={ref}
        type="text"
        className={classNameWrapper}
        value={valueObj.link || ''}
        onChange={handleChange}
        placeholder='Link do Botão'
        id='link'
      />
      {MdComp}
    </div>
  );
});

Control.propTypes = {
  onChange: PropTypes.func.isRequired,
  forID: PropTypes.string,
  value: PropTypes.node,
  classNameWrapper: PropTypes.string.isRequired,
};

Control.defaultProps = {
  value: { 
    enable: false,
    md: '',
    title: '',
    button: '',
    link: '#'
  },
};

export default Control;
