<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OtpNotification extends Notification
{
    use Queueable;
    public $otp;
    public function __construct($otp)
    {
        $this->otp = $otp;
    }
    public function via($notifiable)
    {
        return ['mail'];
    }
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Kode OTP Reset Password')
            ->line('Gunakan kode ini untuk reset password:')
            ->line("**{$this->otp}**")
            ->line('Kadaluarsa dalam 10 menit.');
    }
}
