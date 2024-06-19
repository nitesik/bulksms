import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useGetAllSmsQuery, useMeQuery } from "@/generated/graphql";
import { columns } from "@/lib/columns";
import Head from "next/head";
import router from "next/router";
import * as Lucide from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export default function BmobileOutgoingPage() {
  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const {
    data,
    loading,
    error,
    refetch: refetchData,
  } = useGetAllSmsQuery({
    pollInterval: 10000,
  });

  const [searchField, setSearchField] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dateSchema = z.coerce.date();

  if (meLoading) return;

  if (!meData?.Me) router.push("/login");

  return (
    meData &&
    data && (
      <section className="bg-background flex-1">
        <Head>
          <title>B-Mobile Outgoing</title>
        </Head>
        <div className="flex justify-center py-7 min-h-full">
          <div className="xl:max-w-[1100px] 2xl:max-w-[1500px] w-full flex justify-center">
            <div className="xl:max-w-[1000px] 2xl:max-w-[1300px] flex flex-col gap-4">
              <DataTable
                fromDate={fromDate}
                searchField={searchField}
                setFromDate={setFromDate}
                setSearchField={setSearchField}
                setToDate={setToDate}
                toDate={toDate}
                columns={columns}
                data={data.GetAllSMS.filter((prev) =>
                  prev.phone.startsWith("17")
                )
                  .filter(
                    (prev) =>
                      prev.phone.includes(searchField) ||
                      prev.content
                        .toLowerCase()
                        .includes(searchField.toLowerCase())
                  )
                  .filter((prev) => {
                    if (!fromDate) return true;
                    else {
                      return (
                        dateSchema.parse(prev.time).getTime() >
                        dateSchema.parse(fromDate).getTime()
                      );
                    }
                  })
                  .filter((prev) => {
                    if (!toDate) return true;
                    else {
                      return (
                        dateSchema.parse(prev.time).getTime() <
                        dateSchema.parse(toDate).getTime()
                      );
                    }
                  })}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
