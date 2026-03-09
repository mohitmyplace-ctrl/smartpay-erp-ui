"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function PaymentsPage() {
    const [payments, setPayments] = useState<any[]>([])
    const [invoiceID, setInvoiceID] = useState("")
    const [amount, setAmount] = useState("")
    const [invoices, setInvoices] = useState<any[]>([])

    async function loadPayments() {
        const { data } = await supabase.from("payments").select("*")
        setPayments(data || [])
    }

    async function loadInvoices() {
        const { data } = await supabase.from("invoices").select("*")
        setInvoices(data || [])
    }
    useEffect(() => {
        loadPayments()
        loadInvoices()
    }, [])

    async function recordPayment(){
        console.log("Recording payment for invoice", invoiceID, "amount", amount)
        const { data, error } = await supabase.from("payments").insert([
            {
                invoice_id:invoiceID, 
                amount:Number(amount), 
                payment_method:"upi"
            }
        ])
        if(error){
            console.error("Error recording payment", error)
            return
        }
        else{
            console.log("Payment recorded", data)
        }

        // update invoice status to PAID
        await supabase.from("invoices").update({status:"PAID"}).eq("id", invoiceID)
        setInvoiceID("")
        setAmount("")
        loadPayments()
    }

    return (
        <div>
            <h1>Payments</h1>
            <div style={{marginBottom:20}}>
                <input
                    style={{border:"1px solid gray", padding:8, marginRight:10}}
                    placeholder="Invoice"
                    value={invoiceID}
                    onChange={(e) => setInvoiceID(e.target.value)}
                />
                <option value="">Select Invoice</option>
                {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                        {inv.invoice_number}
                    </option>
                ))}
                <input
                    style={{border:"1px solid gray", padding:8, marginRight:10}}
                    placeholder="Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                    style={{padding:10, backgroundColor:"blue", color:"white", border:"none", cursor:"pointer"}}
                    onClick={recordPayment}
                >
                Record Payment
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{padding:10}}>Invoice</th>
                        <th style={{padding:10}}>Amount</th>
                        <th style={{padding:10}}>Method</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((pay) => (
                        <tr key={pay.id}>
                            <td style={{padding:10}}>{pay.invoice_id}</td>
                            <td style={{padding:10}}>{pay.amount}</td>
                            <td style={{padding:10}}>{pay.payment_method}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}