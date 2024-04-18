import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { UserPagination } from "@/wrappers";
import { TUserItem } from "@/types/user";
import { TMeta } from "@/types/meta";
import initialMeta from "@/mock/meta";

const inter = Inter({ subsets: ["latin"] });

type TGetServerSideProps = {
  statusCode: number;
  res: { data: TUserItem[]; meta: TMeta };
};

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const url = new URL("http://localhost:3000/users");

    if (ctx.query.activePage) {
      url.searchParams.append("activePage", ctx.query.activePage as string);
    }

    const res = await fetch(url);
    if (!res.ok) {
      return { props: { statusCode: res.status, res: { data: [], meta: initialMeta } } };
    }

    return {
      props: { statusCode: 200, res: await res.json() },
    };
  } catch (e) {
    return { props: { statusCode: 500, res: { data: [], meta: initialMeta } } };
  }
}) satisfies GetServerSideProps<TGetServerSideProps>;

export default function Home({ statusCode, res }: TGetServerSideProps) {
  const { data, meta } = res;

  if (statusCode !== 200) {
    return <Alert variant={"danger"}>Error {statusCode} occurred while loading data</Alert>;
  }

  return (
    <>
      <Head>
        <title>Test Assignment</title>
        <meta name="description" content="Test Assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <h1 className={"mb-5"}>Users</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UserPagination meta={meta} />
        </Container>
      </main>
    </>
  );
}
