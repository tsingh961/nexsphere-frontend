
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FeedContent from "@/components/feed/FeedContent";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex w-full">
        <div className="flex-1">
          <FeedContent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
