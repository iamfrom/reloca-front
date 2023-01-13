import { useModalState } from '@/components/modal-views/context';
import { useCards } from '@/data/card';
import ErrorMessage from '@/components/ui/error-message';
import StripePaymentModal from '@/components/payment/stripe/stripe-payment-modal';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';

const PAYMENTS_FORM_COMPONENTS: any = {
  STRIPE: {
    component: StripePaymentModal,
  },
};

const PaymentModal = () => {
  const {
    data: { paymentGateway, paymentIntentInfo, trackingNumber },
  } = useModalState();
  const { cards, isLoading, error } = useCards();
  const PaymentMethod = PAYMENTS_FORM_COMPONENTS[paymentGateway?.toUpperCase()];
  const PaymentComponent = PaymentMethod?.component;

  if (isLoading) {
    return (
      <div className="h-96 w-screen max-w-md rounded-xl bg-white p-12 dark:bg-dark-250 xs:max-w-[400px] md:max-w-[590px] md:rounded-xl lg:max-w-[736px]">
        <PageLoader showText={false} className="h-full" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <PaymentComponent
      paymentIntentInfo={paymentIntentInfo}
      trackingNumber={trackingNumber}
      paymentGateway={paymentGateway}
      cards={cards}
    />
  );
};
export default PaymentModal;
