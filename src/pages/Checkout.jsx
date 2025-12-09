
// src/pages/Checkout.jsx
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCartOrder } from "../services/products";
import { useCart } from "../context/CartContext";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
});

const Checkout = () => {
  const { items, totalAmount, dispatch } = useCart();

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      address: "",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: createCartOrder,
    onSuccess: () => {
      toast.success("Order sent to fake API successfully 🎉");
      dispatch({ type: "CLEAR" });
      reset();
    },
    onError: () => {
      toast.error("Something went wrong sending your order.");
    },
  });

  const onSubmit = (formData) => {
    if (!items.length) {
      toast.warning("Your cart is empty.");
      return;
    }

    const payload = {
      userId: 1,
      date: new Date().toISOString().slice(0, 10),
      products: items.map((item) => ({
        productId: item.id,
        quantity: item.qty,
      })),
      meta: formData,
    };

    mutation.mutate(payload);
  };

  return (
    <main className="page checkout">
      <section className="checkout-cart">
        <h1>Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty. Add a few things from the Store page.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <p className="cart-title">{item.title}</p>
                  <p className="cart-meta">
                    {item.qty} × ${item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-total">Total: ${totalAmount}</p>
      </section>

      <section className="checkout-form-wrap">
        <h2>Fake checkout</h2>
        <p className="checkout-note">
          This calls the <code>/carts</code> endpoint of FakeStore API using a
          TanStack <code>useMutation</code>. No real payment is made.
        </p>

        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="field-error">{errors.fullName.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} />
            {errors.email && (
              <p className="field-error">{errors.email.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="address">Delivery note</label>
            <textarea
              id="address"
              rows={3}
              placeholder="eg: Leave at reception, call when you arrive…"
              {...register("address")}
            />
            {errors.address && (
              <p className="field-error">{errors.address.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending order…" : "Send fake order"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
