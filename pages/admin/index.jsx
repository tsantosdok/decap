import { Control, Preview } from '../../src/admin-components/test'
import Head from "next/head"
import dynamic from 'next/dynamic';

const CMS = dynamic(
  () =>
    import('decap-cms-app').then((cms) => {
      cms.init();
      cms.registerWidget('test', Control, Preview, {"value": '', "enable": ''})
    }),
  { ssr: false, loading: () => <p>Loading Admin...</p> },
);

const Admin = () => {
  return (
    <>
      <CMS />
      <Head>
        <link href="../admin/config.yml" type="text/yaml" rel="cms-config-url" />
      </Head>
      <article>
      </article>
    </>
  )
};
export default Admin;