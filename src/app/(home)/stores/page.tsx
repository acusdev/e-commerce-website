import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Map, MapPin, Phone, Search, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-56px)] flex gap-4">
      <div className="max-w-xl w-full flex flex-col border rounded-md h-fit">
        <div className="flex flex-col gap-2 p-4">
          <label className="text-md font-semibold">Danh sách cửa hàng</label>
          <Input placeholder="Nhập vị trí để tìm cửa hàng gần nhất" startIcon={<Search className="size-4.5" />} />
        </div>
        <div className="max-h-[calc(100vh-188px)] overflow-y-auto px-4">
          <div className="flex gap-2 rounded-md border shadow overflow-hidden mb-4 max-h-[180px] min-h-[180px]">
            <div className="flex flex-col p-4 gap-2 ">
              <div className="flex items-center gap-2">
                <Store className="size-5" />
                <label className="font-medium">Pizza 4P&apos;s Lê Thánh Tôn</label>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer">
                <MapPin className="min-w-4 min-h-4" />
                <p className="text-sm">8/15, Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh 700000</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer">
                <Clock className="size-4" />
                <p className="text-sm">8h00 - 22h00 (tất cả các ngày trong tuần)</p>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <Link
                  href="tel:02871000132"
                  target="_blank"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "flex-1",
                  })}
                >
                  <Phone className="size-4" />
                  <p>Đặt bàn ngay</p>
                </Link>
                <Link
                  href="tel:02871000132"
                  target="_blank"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "flex-1",
                  })}
                >
                  <Map className="size-4" />
                  <p>Chỉ đường</p>
                </Link>
              </div>
            </div>
            <Image src="/placeholders/store.png" alt="Store image" width={180} height={100} className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22006.4284078921!2d106.67504658715822!3d10.772019999999989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4937cb401d%3A0x985b0267c61f8139!2zUGl6emEgNFDigJlzIEzDqiBUaMOhbmggVMO0bg!5e1!3m2!1svi!2s!4v1751534276485!5m2!1svi!2s"
          className="w-full h-full rounded-md"
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
