import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";

export default function Topbar() {
  return (
    <div className="w-full py-4 px-4 rounded-lg flex items-center justify-between backdrop-blur-md bg-black/20">
      <h2 className="w-max whitespace-nowrap text-3xl font-medium text-white">
        Admin Dashboard
      </h2>
      <aside>
        <CustomConnectButton />
      </aside>
    </div>
  );
}
